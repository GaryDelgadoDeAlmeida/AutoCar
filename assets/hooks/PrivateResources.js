import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivateRessource(url, useToken = true) {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    let 
        items = useRef({}),
        error = useRef({}),
        storageUser = localStorage.getItem("user") ?? "",
        user = JSON.parse(storageUser.length > 0 ? storageUser : null)
    ;
    
    let headers = {
        "Content-Type": "application/json",
        "Credentials": "same-origin",
        "Accept": "application/json",   
    }
    
    if(useToken) {
        headers.Authorization = "Bearer " + (user ? user.token : "")
    }
    
    const load = async () => {
        setLoading(true)
        
        await axios
            .get(url, {
                headers: headers
            })
            .then((response) => {
                items.current = response.data
            })
            .catch((err) => {
                error.current = err
            })
        ;

        // If Token is expired
        if(Object.keys(error.current).length > 0 && error.current.response.status === 401) {
            localStorage.setItem("user", "")
            navigate(user && user.role == "ROLE_ADMIN" ? "/admin-login" : "/login")
            return
        }

        setLoading(false)
    }

    return {
        loading,
        items: items.current,
        load,
        error: error.current
    }
}