import React, { useEffect } from "react";
import { 
    loadCaptchaEnginge, 
    LoadCanvasTemplate, 
    LoadCanvasTemplateNoReload
} from 'react-simple-captcha';

export default function CaptchaField({fieldName = "captcha", updateCredentials}) {
    useEffect(() => {
        loadCaptchaEnginge(6)
    }, [])

    const handleChange = (e) => {
        updateCredentials(fieldName, e.currentTarget.value)
    }

    return (
        <>
            <LoadCanvasTemplateNoReload />
            <input 
                type={"text"} 
                onChange={(e) => handleChange(e)} 
                placeholder={"Captcha"}
                required 
            />
        </>
    )
}