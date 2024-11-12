import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination"
import Notification from "../../components/Notification";
import PrivateRessource from "../../hooks/PrivateResources";
import ArticleCard from "../../components/ArticleCard";
import { Link } from "react-router-dom";

export default function Articles() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/blogs?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-home-2.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Articles</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link to={"/"}>Home</Link>
                        <span>Articles</span>
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
                                <>
                                    {Object.values(items.results ?? {}).length > 0 ? (
                                        <div className={"d-grid -col-3"}>
                                            {Object.values(items.results ?? {}).map((item, index) => (
                                                <ArticleCard key={index} article={item} />
                                            ))}
                                        </div>
                                    ) : (
                                        <Notification classname={"warning"} message={"No vehicles has been found"} />
                                    )}

                                    <Pagination
                                        offset={offset}
                                        setOffset={setOffset}
                                        maxOffset={items.maxOffset}
                                    />
                                </>
                            )}
                        </>
                    )}
                </div>
            </section>
        </Header>
    )
}