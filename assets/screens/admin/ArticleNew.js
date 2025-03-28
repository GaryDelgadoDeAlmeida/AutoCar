import React from "react";
import ArticleForm from "../../forms/ArticleForm";
import HeaderAdmin from "../../components/HeaderAdmin";
import { Link } from "react-router-dom";

export default function ArticleNew() {

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/blog"}>Return</Link>

            <section className={"page-section"}>
                <div className={"card"}>
                    <div className={"-header"}>
                        <label className={"-title"}>Add an article</label>
                    </div>
                    <div className={"-content"}>
                        <ArticleForm />
                    </div>
                </div>
            </section>
        </HeaderAdmin>
    )
}