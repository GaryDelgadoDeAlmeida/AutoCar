import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";
import Notification from "../../components/Notification";
import PrivateRessource from "../../hooks/PrivateResources";
import { formatDate, stripHTML } from "../../hooks/DomControl";

export default function Inbox() {

    const { inboxID } = useParams()
    if(isNaN(inboxID)) {
        return <Navigate to={"/admin/inboxes"} />
    }

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/backoffice/inbox/${inboxID}`)
    
    useEffect(() => {
        load()
    }, [inboxID])

    const handleRemove = (e, inboxID) => {
        e.preventDefault()

        if(!confirm("This action is irreversible. Do you confirm your removal request ?")) {
            return
        }

        if(isNaN(inboxID)) {
            return
        }

        console.log("Hi removal request !")
    }

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/inboxes"}>Return</Link>
            {!loading && Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                <button type={"button"} className={"btn btn-red ml-5"} onClick={(e) => handleRemove(e, items.id)}>Remove</button>
            )}

            <section className={"page-section mt-50"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}

                        {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                            <>
                                <div className={"d-flex mb-25"}>
                                    <div className={"w-200px"}>
                                        <label className={"fw-bold"}>Sender</label>
                                    </div>
                                    <div className={"mx-100 mx-auto"}>
                                        <p className={"fw-bold m-0"}>{items.fullname}</p>
                                        <p className={"m-0"}>{items.email}</p>
                                    </div>
                                </div>
                                <div className={"d-flex mb-25"}>
                                    <div className={"w-200px"}>
                                        <label className={"fw-bold"}>Subject</label>
                                    </div>
                                    <div className={"mx-100 mx-auto"}>
                                        <p className={"fw-bold m-0"}>{items.subject}</p>
                                    </div>
                                </div>
                                <div className={"d-flex mb-25"}>
                                    <div className={"w-200px"}>
                                        <label className={"fw-bold"}>Message</label>
                                    </div>
                                    <div className={"w-100 mx-100 mx-auto"}>
                                        <div className={"card"}>
                                            <div className={"-content"}>
                                                <p className={"m-0"}>{stripHTML(items.message)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={"d-flex mb-25"}>
                                    <div className={"w-200px"}>
                                        <label className={"fw-bold"}>Sended at</label>
                                    </div>
                                    <div className={"mx-100 mx-auto"}>
                                        <p className={"fw-bold m-0"}>{formatDate(items.createdAt)}</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}