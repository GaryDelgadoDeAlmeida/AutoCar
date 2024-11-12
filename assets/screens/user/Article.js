import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import PrivateResources from "../../hooks/PrivateResources"
import Notification from "../../components/Notification";

export default function Article() {

    const { blogID } = useParams()
    if(isNaN(blogID)) {
        return <Navigate to={"/blog"} />
    }

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/blog/${blogID}`)

    useEffect(() => {
        load()
    }, [blogID])

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-home-2.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Article</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link to={"/"}>Home</Link>
                        <Link to={"/blog"}>Articles</Link>
                        <span>Article</span>
                    </div>
                </div>
            </section>

            <section className={"page-section"}>
                <div className={"page-wrapper"}>
                    {loading && (
                        <Notification classname={"information"} message={"Loading ..."} />
                    )}

                    {!loading && (
                        <>
                            {Object.keys(error).length > 0 && (
                                <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                            )}

                            {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                                <p>Hello World</p>
                            )}
                        </>
                    )}
                </div>
            </section>
        </Header>
    )
}