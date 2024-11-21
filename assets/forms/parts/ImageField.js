import React, { useEffect, useState } from "react";

export default function ImageField({fieldName, fieldValue, updateCredentials}) {

    const [image, setImage] = useState(null)

    useEffect(() => {
        updateCredentials(fieldName, image)
    }, [image])

    const handleChange = (e) => {
        setImage(e.currentTarget.files[0] ?? null)
    }

    return (
        <input 
            id={fieldName}
            type={"file"}
            max={1}
            onChange={(e) => handleChange(e)}
        />
    )
}