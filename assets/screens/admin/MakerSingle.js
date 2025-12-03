import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import PrivateResources from "../../hooks/PrivateResources";
import Notification from "../../components/Notification";
import axios from "axios";

export default function MakerSingle() {

    const { makerID } = useParams()
    if(isNaN(makerID)) {
        return <Navigate to={"/admin/makers"} />
    }

    const [removeResponse, setRemoveResponse] = useState({})
    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/maker/${makerID}`)

    useEffect(() => {
        load()
    }, [makerID])

    const handleRemove = (e, makerID) => {
        e.preventDefault()

        if(!confirm("Are you sure ? This action is irreversible !")) {
            return
        }

        let redirectAfterProcess = false

        axios
            .delete(`${window.location.origin}/api/backoffice/maker/${makerID}/remove`, {
                headers: {
                    "Authorization": "Bearer " + (localStorage.getItem("token") ?? "")
                }
            })
            .then((response) => {
                if(response.status == 204) {
                    redirectAfterProcess = true
                }
            })
            .catch((error) => {
                let errorMessage = "An error has been encountered during the removal process"
                if(error.response.data.message) {
                    errorMessage = error.response.data.message
                } else if(error.response.data.detail) {
                    errorMessage = error.response.data.detail
                }

                setRemoveResponse({classname: "danger", message: errorMessage})
            })
        ;

        // If the removal action processed successfully then, redirect the client to the listing of makers
        if(redirectAfterProcess) {
            return <Navigate to={"/admin/makers"} />
        }
    }

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/makers"}>Return</Link>
            {!loading && Object.keys(items ?? {}).length > 0 && Object.keys(error).length == 0 && (
                <>
                    <Link className={"btn btn-orange ml-5"} to={`/admin/maker/${items.maker.id}/edit`}>Edit</Link>
                    <button type={"button"} className={"btn btn-red ml-5"} onClick={(e) => handleRemove(e, items.maker.id)}>Remove</button>
                </>
            )}

            <section className={"page-section"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}

                        {Object.keys(items ?? {}).length > 0 && Object.keys(error).length == 0 && (
                            <>
                                <div className={"d-grid -col-4 -g-25"}>
                                    <div className={"card"}>
                                        <div className={"-content"}>
                                            <div className={"d-col -g-5"}>
                                                <label className={"fw-bold"}>Localisation</label>
                                                <span>{items.maker.location && items.maker.location.length > 0 ? items.maker.location : "N/A"}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"card"}>
                                        <div className={"-content"}>
                                            <div className={"d-col -g-5"}>
                                                <label className={"fw-bold"}>Nbr vehicles</label>
                                                <span>{items.nbrVehicles ?? 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"card"}>
                                        <div className={"-content"}>
                                            <div className={"d-col -g-5"}>
                                                <label className={"fw-bold"}>Founded at</label>
                                                <span>{(new Date(items.maker.foundedAt)).getFullYear()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={"mt-50"}>
                                    {items.maker.logo && (
                                        <img className={"w-200px"} src={`${window.location.origin}${items.maker.logo}`} alt={items.maker.name} />
                                    )}
                                    <h1>{items.maker.name}</h1>

                                    {items.maker.description && items.maker.description.length > 0 && (
                                        <div className={"card mt-25"}>
                                            <div className={"-content"} dangerouslySetInnerHTML={{__html: items.maker.description}}></div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}