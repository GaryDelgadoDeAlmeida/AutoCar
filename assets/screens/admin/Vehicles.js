import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableCard from "../../components/TableCard"
import Pagination from "../../components/Pagination"
import HeaderAdmin from "../../components/HeaderAdmin";
import Notification from "../../components/Notification"
import PrivateResources from "../../hooks/PrivateResources"
import SearchVehicleForm from "../../forms/SearchVehicleForm"

export default function Vehicles() {

    const [offset, setOffset] = useState(1)
    const [credentials, setCredentials] = useState({})
    const { loading, items, load, error } = PrivateResources(
        credentials.length == 0 
            ? `${window.location.origin}/api/vehicles?offset=${offset}`
            : `${window.location.origin}/api/vehicles?` + new URLSearchParams(credentials).toString() + "&offset=" + offset
    )

    useEffect(() => {
        load()
    }, [offset, credentials])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-green"} to={"/admin/vehicles/add"}>Add a vehicle</Link>

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
                                <div className={"mb-25"}>
                                    <SearchVehicleForm
                                        searchCredentials={credentials}
                                        updateCredentials={(fieldValue) => {
                                            setCredentials({
                                                ...credentials,
                                                ...fieldValue
                                            })
                                        }}
                                    />
                                </div>

                                {Object.keys(items.results ?? {}).length > 0 ? (
                                    <div className={"table-list"}>
                                        {Object.values(items.results).map((item, index) => (
                                            <TableCard
                                                key={index}
                                                imgPath={item.photo ?? "/content/img/vehicle-thumbnail.jpg"}
                                                title={`${item.name} (${(new Date(item.buildAt)).getFullYear()})`}
                                                description={item.maker_name}
                                                link={`/admin/vehicle/${item.id}`}
                                                editLink={`/admin/vehicle/${item.id}/edit`}
                                                removalLink={`${window.location.origin}/api/backoffice/vehicle/${item.id}/remove`}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <Notification classname={"warning"} message={"There is no vehicle registered in the database"} />
                                )}

                                <Pagination
                                    offset={items.offset}
                                    setOffset={setOffset}
                                    maxOffset={items.maxOffset}
                                />
                            </>
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}