import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import PrivateResources from "../../hooks/PrivateResources"
import Notification from "../../components/Notification";
import Comments from "./parts/Comments"
import SearchForm from "../../forms/SearchForm"
import RecentArticles from "./parts/RecentArticles"

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
                                <div className={"page-article"}>
                                    <div className={"-left d-col -g-25"}>

                                        {/* Article content */}
                                        <div className={"card"}>
                                            <div className={"-content"}>
                                                <img src={`${window.location.origin}/content/img/background-home-1.jpg`} alt={""} />
                                                <div className={"markup"}>
                                                    <p>Lorem ipsum dolor sit amet. Et vero doloresUt repellat ut nostrum internos ea enim modi. Et sint repellendus <strong>Et magnam cum voluptate voluptas sed vitae repellendus</strong>. </p><h2>Et quae quis ut iure nihil et quaerat dicta. </h2><p>Qui rerum animi <strong>Ea illo ex deleniti quia est optio quia sed consequatur voluptas</strong>. Sit omnis recusandae <a href="https://www.loremipzum.com" target="_blank">Quo voluptatem</a> et magnam deserunt. Qui animi repellendus <em>Cum animi id error laudantium qui ducimus velit est dolorum reiciendis</em>. </p><h3>Ex autem sunt et enim quis. </h3><p>Est quae ipsam qui esse minus <em>Ut cumque et dicta magni cum quos exercitationem sit galisum iusto</em> ut dolore eaque. Et consequatur illo <a href="https://www.loremipzum.com" target="_blank">Et nostrum</a> 33 galisum blanditiis 33 dignissimos provident! At quaerat laboriosam <strong>Ut quia ea adipisci dolorum est explicabo consequuntur</strong> aut dolores animi. </p><h4>Et alias placeat est doloribus facere. </h4><p>Aut magni eaque <em>Aut labore quo amet consequatur ex quod voluptates</em> vel cupiditate quibusdam ut voluptas magni aut voluptatem deserunt. Quo aperiam molestiae <a href="https://www.loremipzum.com" target="_blank">Ut voluptatum quo alias cumque vel inventore repellendus</a> vel provident inventore et accusamus tempore. Quo nobis nulla non facere quia <strong>Id voluptate</strong>. Et alias quisquam rem rerum beataeut voluptates! </p><ul><li>Et vero dolores ad molestiae deserunt ut totam doloremque! </li><li>Aut ipsam quisquam ut repudiandae odit? </li><li>Sit praesentium enim eos officia laboriosam est provident voluptates. </li><li>Aut voluptatem sint est amet assumenda et dolorem porro qui molestiae dolor. </li><li>Quo enim officiis et recusandae nulla. </li></ul><h5>Qui asperiores odio qui nihil distinctio. </h5><p>In sequi vero vel ducimus optioNam molestiae et animi ducimus est sint fuga. Cum tenetur culpa <strong>Vel eligendi non quasi reprehenderit vel voluptatum adipisci</strong> 33 nostrum eveniet non labore itaque. Non sint accusamus vel enim necessitatibus <em>Qui aliquid eum sapiente quod</em> et rerum nisi aut dicta cupiditate eos obcaecati similique. Rem quaerat rerum ut perspiciatis doloreset distinctio est illo similique! </p><p>Sit harum obcaecati <em>Et necessitatibus et nihil rerum et explicabo vitae eos porro minima</em>. Sit assumenda provident <strong>Rem numquam et consequatur cumque et molestiae porro</strong>. </p><p>Et ullam magnam <a href="https://www.loremipzum.com" target="_blank">In delectus cum reprehenderit unde ea ipsa quos</a> sit provident dolores aut amet nisi. Et tempore beatae non nihil iure <em>Qui nemo ut praesentium repellendus nam quasi eligendi</em>! </p><p>Ut necessitatibus velit <a href="https://www.loremipzum.com" target="_blank">Aut corrupti in reiciendis praesentium est error voluptates vel culpa adipisci</a> At eligendi harum et ipsum magnam. A doloribus similique et dolorum incidunt <em>Ut placeat id provident quia ea velit itaque qui repellat molestiae</em> ut quibusdam magnam. Vel voluptatibus temporeEt nesciunt et veritatis harum est sapiente cupiditate sed veniam quia. Et dicta nihilEa quos id optio quae ut commodi consequatur sed architecto doloribus. </p><ol><li>Sit repellat reiciendis est repellendus dolor ut sint voluptatem. </li><li>Ut odio quasi hic voluptatibus quia et facilis culpa eum molestias eligendi. </li><li>Eum voluptates galisum et quis odio rem asperiores perferendis? </li><li>Qui consequatur ducimus et eius sunt id voluptatem consequatur. </li><li>Et excepturi sequi qui possimus consectetur est galisum reiciendis. </li><li>Ea aliquam vero est impedit quae aut magni magnam. </li></ol>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Comments sections */}
                                        <div className={"card"}>
                                            <div className={"-header"}>
                                                <label className={"-title"}>Comments</label>
                                            </div>
                                            <div className={"-content"}>
                                                <Comments />
                                            </div>
                                        </div>
                                    </div>
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
                                                <RecentArticles />
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