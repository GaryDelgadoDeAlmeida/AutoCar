import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import PrivateResources from "../../hooks/PrivateResources"
import Notification from "../../components/Notification";
import SearchForm from "../../forms/SearchForm";
import RecentArticles from "./parts/RecentArticles"
import Comments from "./parts/Comments";

export default function Article() {

    const { blogID } = useParams()
    if(isNaN(blogID)) {
        return <Navigate to={"/blog"} />
    }

    const isConnected = localStorage.getItem("token")
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
                    <Link className={"btn btn-secondary"} to={"/blog"}>Return</Link>

                    {loading && (
                        <Notification classname={"information mt-25"} message={"Loading ..."} />
                    )}

                    {!loading && (
                        <>
                            {Object.keys(error).length > 0 && (
                                <Notification classname={"danger mt-25"} message={error.response.data.message ?? error.response.data.detail} />
                            )}

                            {Object.keys(items).length > 0 && Object.keys(error).length == 0 && (
                                <div className={"page-article mt-25"}>

                                    {/* Left col */}
                                    <div className={"-left d-col -g-25"}>

                                        {/* Article content */}
                                        <div className={"card"}>
                                            <div className={"-content"}>
                                                {items.article.photo && (
                                                    <img src={`${window.location.origin}${items.article.photo}`} alt={items.article.title} />
                                                )}
                                                <h2 className={"fs-26 txt-left mb-25"}>{items.article.title}</h2>
                                                <div className={"markup"} dangerouslySetInnerHTML={{__html: items.article.content}}></div>
                                            </div>
                                        </div>

                                        {/* Comments sections */}
                                        <div className={"card"}>
                                            <div className={"-header"}>
                                                <label className={"-title"}>Comments</label>
                                            </div>
                                            <div className={"-content"}>
                                                <Comments
                                                    articleID={items.article.id}
                                                    allowArticleComments={false}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right col */}
                                    <div className={"-right d-col -g-25"}>
                                        {/* Search Form */}
                                        <div className={"card"}>
                                            <div className={"-header"}>
                                                <label className={"-title"}>Search</label>
                                            </div>
                                            <div className={"-content"}>
                                                <SearchForm />
                                            </div>
                                        </div>

                                        {/* Recent posts */}
                                        <div className={"card"}>
                                            <div className={"-header"}>
                                                <label className={"-title"}>Recent posts</label>
                                            </div>
                                            <div className={"-content"}>
                                                <RecentArticles
                                                    articles={items.recent_articles}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </Header>
    )
}