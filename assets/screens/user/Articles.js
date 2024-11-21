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
                                        <div className={"d-grid -col-4"}>
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

                    {/* Temporary: Start */}
                    <div className={"mt-25 d-grid -col-4 -g-25"}>
                        <ArticleCard article={{
                            id: 0,
                            title: "Why is BMW loved ?",
                            content: "BMWs have a differebt kube with their designs and almost [...]",
                            imgPath: "/content/img/cars/bmw-8-series-convertible-technical-data-sp-desktop.jpg",
                            created_at: "2024-07-06"
                        }} />
                        <ArticleCard article={{
                            id: 0,
                            title: "How solid is Audi ?",
                            content: "According to Euro NCAP data with different test organizations, there [...]",
                            imgPath: "/content/img/cars/bmw88.jpg",
                            created_at: "2024-07-06"
                        }} />
                        <ArticleCard article={{
                            id: 0,
                            title: "What brand is Skoda ?",
                            content: "Skoda is one the leading automotive manufacturers on the [...]",
                            imgPath: "/content/img/cars/volkswagen-passat-1280x720-1.jpg",
                            created_at: "2024-07-06"
                        }} />
                        <ArticleCard article={{
                            id: 0,
                            title: "Is the Auris diesel ?",
                            content: "You will have a quieter vechile that burns less than [...]",
                            imgPath: "/content/img/cars/yeni-ibiza-2.jpg",
                            created_at: "2024-07-06"
                        }} />
                        <ArticleCard article={{
                            id: 0,
                            title: "Why is BMW loved ?",
                            content: "BMWs have a differebt kube with their designs and almost [...]",
                            imgPath: "/content/img/cars/bmw-8-series-convertible-technical-data-sp-desktop.jpg",
                            created_at: "2024-07-06"
                        }} />
                        <ArticleCard article={{
                            id: 0,
                            title: "How solid is Audi ?",
                            content: "According to Euro NCAP data with different test organizations, there [...]",
                            imgPath: "/content/img/cars/bmw88.jpg",
                            created_at: "2024-07-06"
                        }} />
                        <ArticleCard article={{
                            id: 0,
                            title: "What brand is Skoda ?",
                            content: "Skoda is one the leading automotive manufacturers on the [...]",
                            imgPath: "/content/img/cars/volkswagen-passat-1280x720-1.jpg",
                            created_at: "2024-07-06"
                        }} />
                        <ArticleCard article={{
                            id: 0,
                            title: "Is the Auris diesel ?",
                            content: "You will have a quieter vechile that burns less than [...]",
                            imgPath: "/content/img/cars/yeni-ibiza-2.jpg",
                            created_at: "2024-07-06"
                        }} />
                    </div>

                    <Pagination
                        offset={offset}
                        setOffset={setOffset}
                        maxOffset={10}
                    />
                    {/* Temporary: End */}
                </div>
            </section>
        </Header>
    )
}