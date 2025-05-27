import React from "react";

export default function Pagination({offset, maxOffset, setOffset}) {

    const handlePagination = (newOffset) => {
        setOffset(newOffset)
    }

    return (
        <>
            {offset > 0 && offset <= maxOffset && maxOffset > 1 && (
                <div className={"pagination"}>
                    {offset - 1 >= 1 && (
                        <>
                            {offset - 1 > 1 && (
                                <button 
                                    type={"button"} 
                                    className={"item"} 
                                    onClick={() => handlePagination(1)}
                                >1</button>
                            )}

                            {offset - 2 > 1 && (
                                <button 
                                    type={"button"} 
                                    className={"item"}
                                >...</button>
                            )}

                            <button 
                                type={"button"} 
                                className={"item"} 
                                onClick={() => handlePagination(offset - 1)}
                            >{offset - 1}</button>
                        </>
                    )}
                
                    <button type={"button"} className={"item current-page"}>{offset}</button>
                    
                    {offset + 1 <= maxOffset && (
                        <>
                            <button 
                                type={"button"} 
                                className={"item"} 
                                onClick={() => handlePagination(offset + 1)}
                            >{offset + 1}</button>

                            {offset + 2 < maxOffset && (
                                <button 
                                    type={"button"} 
                                    className={"item"}
                                >...</button>
                            )}

                            {offset + 1 < maxOffset && (
                                <button 
                                    type={"button"} 
                                    className={"item"} 
                                    onClick={() => handlePagination(maxOffset)}
                                >{maxOffset}</button>
                            )}
                        </>
                    )}
                </div>
            )}
        </>
    )
}