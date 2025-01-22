import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../../../components/ArticleCard";
import PrivateResources from "../../../hooks/PrivateResources"

export default function HomeRecentArticles() {

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/blogs?offset=${1}`)

    useEffect(() => {
        load()
    }, [])

    return (
        <section className={"page-section"}>
            <div className={"page-wrapper"}>
                <h2 className={"page-title"}>Recent articles</h2>
                <p className={"page-description"}>Usefull information about cars</p>

                <div className={"mt-25 d-grid -col-4 -g-25"}>
                    <ArticleCard article={{
                        id: 0,
                        title: "Why is BMW loved ?",
                        content: "BMWs have a differebt kube with their designs and almost [...]",
                        photo: "/content/img/cars/bmw-8-series-convertible-technical-data-sp-desktop.jpg",
                        created_at: "2024-07-06"
                    }} />
                    <ArticleCard article={{
                        id: 0,
                        title: "How solid is Audi ?",
                        content: "According to Euro NCAP data with different test organizations, there [...]",
                        photo: "/content/img/cars/bmw88.jpg",
                        created_at: "2024-07-06"
                    }} />
                    <ArticleCard article={{
                        id: 0,
                        title: "What brand is Skoda ?",
                        content: "Skoda is one the leading automotive manufacturers on the [...]",
                        photo: "/content/img/cars/volkswagen-passat-1280x720-1.jpg",
                        created_at: "2024-07-06"
                    }} />
                    <ArticleCard article={{
                        id: 0,
                        title: "Is the Auris diesel ?",
                        content: "You will have a quieter vechile that burns less than [...]",
                        photo: "/content/img/cars/yeni-ibiza-2.jpg",
                        created_at: "2024-07-06"
                    }} />
                </div>
                
                <div className={"txt-center mt-50"}>
                    <Link className={"btn btn-secondary fw-bold btn-m"} to={"/blog"}>
                        <span>Show More</span>
                    </Link>
                </div>
            </div>
        </section>
    )
}