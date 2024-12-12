import React from "react";
import { Link } from "react-router-dom";
import { findParent } from "../hooks/DomControl"
import axios from "axios";

export default function TableCard({imgPath, title, description, link, removalLink = null}) {

    const handleRemove = (e) => {
        if(!confirm("Are you sure you want to delete this fuel ? This action is irreversible")) {
            return
        }

        let parent = findParent(e.currentTarget, "table-card");
        if(!parent) {
            return;
        }

        axios
            .delete(`${removalLink}`, {
                headers: {
                    "Authorization": "Bearer " + (localStorage.getItem("token") ?? "")
                }
            })
            .then((response) => {
                parent.remove()
            })
            .catch((error) => {
                alert(error.response.data.message ?? error.response.data.detail)
            })
        ;
    }

    return (
        <div className={"table-card"}>
            <div className={"-content"}>
                {imgPath != null && (
                    <img src={`${window.location.origin}${imgPath}`} alt={""} />
                )}

                <div className={"-infos"}>
                    <label className={"-title"}>{title}</label>
                    <span className={"-description"}>{description}</span>
                </div>
            </div>
            <div className={"-footer"}>
                {removalLink != null && (
                    <button 
                        type={"button"} 
                        className={"btn btn-red"} 
                        onClick={(e) => handleRemove(e)}
                    >Remove</button>
                )}
                
                {link != null && (
                    <Link className={"btn btn-secondary"} to={link}>See more</Link>
                )}
            </div>
        </div>
    )
}