import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TableCard from "../../components/TableCard";
import HeaderAdmin from "../../components/HeaderAdmin";
import Notification from "../../components/Notification";
import PrivateResources from "../../hooks/PrivateResources";

export default function Home() {

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/backoffice/home`)
    
    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderAdmin>
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
                            <div className={"d-grid -col-4 -g-10"}>
                                <div className={"card"}>
                                    <div className={"-content d-col -g-5"}>
                                        <label className={"fw-bold"}>Vehicles</label>
                                        <span className={"fs-20"}>{items.nbrVehicles}</span>
                                    </div>
                                </div>
                                <div className={"card"}>
                                    <div className={"-content d-col -g-5"}>
                                        <label className={"fw-bold"}>Makers / Brands</label>
                                        <span className={"fs-20"}>{items.nbrMakers}</span>
                                    </div>
                                </div>
                                <div className={"card"}>
                                    <div className={"-content d-col -g-5"}>
                                        <label className={"fw-bold"}>Vehicle types</label>
                                        <span className={"fs-20"}>{items.nbrVehicleTypes}</span>
                                    </div>
                                </div>
                                <div className={"card"}>
                                    <div className={"-content d-col -g-5"}>
                                        <label className={"fw-bold"}>Fuels</label>
                                        <span className={"fs-20"}>{items.nbrFuels}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={"page-section"}>
                                <div className={"table-list"}>
                                    <TableCard
                                        imgPath={""}
                                        title={"Vehicle1"}
                                        description={"07_11_2024"}
                                        link={"/admin/vehicle/1"}
                                    />
                                    <TableCard
                                        imgPath={""}
                                        title={"Vehicle2"}
                                        description={"07_11_2024"}
                                        link={"/admin/vehicle/1"}
                                    />
                                    <TableCard
                                        imgPath={""}
                                        title={"Vehicle3"}
                                        description={"07_11_2024"}
                                        link={"/admin/vehicle/1"}
                                    />
                                    <TableCard
                                        imgPath={""}
                                        title={"Vehicle4"}
                                        description={"07_11_2024"}
                                        link={"/admin/vehicle/1"}
                                    />
                                    <TableCard
                                        imgPath={""}
                                        title={"Vehicle5"}
                                        description={"07_11_2024"}
                                        link={"/admin/vehicle/1"}
                                    />
                                </div>
                                <div className={"mt-25 txt-right"}>
                                    <Link className={"btn btn-secondary btn-m fw-bold"} to={"/admin/vehicles"}>See all vehicles</Link>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </HeaderAdmin>
    )
}