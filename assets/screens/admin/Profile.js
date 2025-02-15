import React from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import ProfileForm from "../../forms/ProfileForm"
import ProfilePasswordForm from "../../forms/ProfilePasswordForm";

export default function Profile() {

    return (
        <HeaderAdmin>
            <div className={"page-hero-2nd"}>
                <div className={"hero-background"}></div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Profile</h1>
                </div>
            </div>

            <section className={"page-section"}>
                <div className={"card"}>
                    <div className={"-content"}>
                        <ProfileForm />
                    </div>
                </div>
                <div className={"card mt-25"}>
                    <div className={"-content"}>
                        <ProfilePasswordForm />
                    </div>
                </div>
            </section>
        </HeaderAdmin>
    )
}