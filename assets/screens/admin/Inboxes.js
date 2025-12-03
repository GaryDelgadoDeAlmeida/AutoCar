import React, { useEffect, useState } from "react";
import TableCard from "../../components/TableCard"
import Pagination from "../../components/Pagination"
import HeaderAdmin from "../../components/HeaderAdmin";
import Notification from "../../components/Notification";
import PrivateResources from "../../hooks/PrivateResources";
import axios from "axios";

export default function Inboxes() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/backoffice/inboxes?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    const handleRemoveAll = (e) => {
        if(!confirm("Are you sure ? This action is irreversible !")) {
            return
        }

        axios
            .delete(`${window.location.origin}/api/backoffice/inboxs/remove`, {
                headers: {
                    "Authorization": "Bearer " + (localStorage.getItem("token") ?? "")
                }
            })
            .then((response) => {
                if(response.status == 204 || response.status == 200) {
                    let tableList = document.getElementsByClassName("table-list")
                    if(tableList.length > 0) {
                        tableList.map((element) => {
                            element.innerHTML(
                                <Notification classname={"danger"} message={"There is no message"} />
                            )
                        })
                    }
                }
            })
            .catch((error) => {
                console.log(error)
                let errorMessage = "An error has been encountered, the removal process has been cancelled"
                if(error.response.data.message) {
                    errorMessage = error.response.data.message
                } else if(error.response.data.detail) {
                    errorMessage = error.response.data.detail
                }
                
                alert(errorMessage)
            })
        ;
    }

    return (
        <HeaderAdmin>
            <button type={"button"} className={"btn btn-red"} onClick={(e) => handleRemoveAll(e)}>Remove All messages</button>

            <section className={"page-section"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}

                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}

                        {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                            Object.keys(items.results).length > 0 ? (
                                <>
                                    <div className={"table-list"}>
                                        {Object.values(items.results).map((item, index) => (
                                            <TableCard
                                                key={index}
                                                title={item.subject}
                                                description={item.email}
                                                link={`/admin/inbox/${item.id}`}
                                                removalLink={`${window.location.origin}/api/backoffice/inbox/${item.id}/remove`}
                                            />
                                        ))}
                                    </div>

                                    <Pagination />
                                </>
                            ) : (
                                <Notification classname={"danger"} message={"There is no message"} />
                            )
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}