import React, { useEffect } from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import ProfileForm from "../../forms/ProfileForm"
import ProfilePasswordForm from "../../forms/ProfilePasswordForm";
import PrivateResources from "../../hooks/PrivateResources";
import Notification from "../../components/Notification";

export default function Profile() {

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/backoffice/profile`)

    useEffect(() => {
        load()
    }, [])

    console.log(items)

    return (
        <HeaderAdmin>
            <div className={"page-hero-2nd"}>
                <div className={"hero-background"}></div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Profile</h1>
                </div>
            </div>

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
                            <>
                                <div className={"card"}>
                                    <div className={"-content"}>
                                        <ProfileForm profile={items} />
                                    </div>
                                </div>
                                <div className={"card mt-25"}>
                                    <div className={"-content"}>
                                        <ProfilePasswordForm />
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