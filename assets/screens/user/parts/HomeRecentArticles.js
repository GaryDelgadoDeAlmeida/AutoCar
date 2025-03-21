import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../../../components/ArticleCard";
import PrivateResources from "../../../hooks/PrivateResources"
import Notification from "../../../components/Notification";

export default function HomeRecentArticles() {

    const { loading, items, load, error } = PrivateResources(`${window.location.origin}/api/blogs?offset=${1}`)

    useEffect(() => {
        load()
    }, [])

    return (
        <>
            {loading && (
                <Notification classname={"information"} message={"Loading ..."} />
            )}

            {!loading && (
                <>
                    {Object.keys(error).length > 0 && (
                        <Notification classname={"danger"} message={error.response.data.message ?? error.response.data.detail} />
                    )}

                    {Object.keys(items).length > 0 && Object.keys(error).length == 0 && Object.keys(items.results ?? {}).length > 0 && (
                        <section className={"page-section"}>
                            <div className={"page-wrapper"}>
                                <h2 className={"page-title"}>Recent articles</h2>
                                <p className={"page-description"}>Usefull information about cars</p>
                
                                <div className={"mt-25 d-grid -col-4 -g-25"}>
                                    {Object.values(items.results).map((item, index) => (
                                        <ArticleCard 
                                            key={index} 
                                            article={item} 
                                        />
                                    ))}
                                </div>
                                
                                <div className={"txt-center mt-50"}>
                                    <Link className={"btn btn-secondary fw-bold btn-m"} to={"/blog"}>
                                        <span>Show More</span>
                                    </Link>
                                </div>
                            </div>
                        </section>
                    )}
                </>
            )}
        </>
    )
}