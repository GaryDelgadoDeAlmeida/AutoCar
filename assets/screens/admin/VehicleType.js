import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../components/HeaderAdmin"
import Notification from "../../components/Notification"
import PrivateResources from "../../hooks/PrivateResources"
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";

export default function VehicleType() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/vehicle-types?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <HeaderAdmin>
            <Link className={"btn btn-green"} to={"/admin/vehicle-types/add"}>Add a car type</Link>

            <section className={"page-section"}>
                {loading && (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}
                {!loading && (
                    <>
                        {Object.keys(error).length > 0 && (
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        )}

                        {Object.keys(items ?? {}).length > 0 && (
                            <>
                                <table className={"table"}>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td data-column={"Title"}>SUV</td>
                                            <td data-column={"Actions"}></td>
                                        </tr>
                                        <tr>
                                            <td data-column={"Title"}>Pick-up</td>
                                            <td data-column={"Actions"}></td>
                                        </tr>
                                        <tr>
                                            <td data-column={"Title"}>Coupe</td>
                                            <td data-column={"Actions"}></td>
                                        </tr>
                                        <tr>
                                            <td data-column={"Title"}>Sport cars</td>
                                            <td data-column={"Actions"}></td>
                                        </tr>
                                        <tr>
                                            <td data-column={"Title"}>Sedan</td>
                                            <td data-column={"Actions"}></td>
                                        </tr>
                                        <tr>
                                            <td data-column={"Title"}>Hatchback</td>
                                            <td data-column={"Actions"}></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <Pagination
                                    maxOffset={1}
                                    offset={offset}
                                    setOffset={setOffset}
                                />
                            </>
                        )}
                    </>
                )}
            </section>
        </HeaderAdmin>
    )
}