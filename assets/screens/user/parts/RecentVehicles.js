import React, { useEffect } from "react";
import PrivateResources from "../../../hooks/PrivateResources";
import Notification from "../../../components/Notification";
import CarCard from "../../../components/CarCard";

export default function RecentVehicles() {

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/vehicles?limit=8`)
    
    useEffect(() => {
        load()
    }, [])

    return (
        <>
            {loading && (
                <div className={"mt-50"}>
                    <Notification classname={"information"} message={"Loading ..."} />
                </div>
            )}

            {!loading && (
                <>
                    {Object.keys(error).length > 0 && (
                        <div className={"mt-50"}>
                            <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                        </div>
                    )}

                    {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                        <>
                            {Object.keys(items.results ?? {}).length > 0 ? (
                                <div className={"d-grid -col-4 mt-50"}>
                                    {Object.values(items.results).map((item, index) => (
                                        <CarCard 
                                            key={index} 
                                            carItem={item}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <Notification classname={"warning"} message={"No vehicle has been found"} />
                            )}
                        </>
                    )}
                </>
            )}
        </>
    )
}