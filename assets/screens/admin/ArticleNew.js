import React from "react";
import ArticleForm from "../../forms/ArticleForm";
import HeaderAdmin from "../../components/HeaderAdmin";

export default function ArticleNew() {

    return (
        <HeaderAdmin>
            <section className={"page-section"}>
                <div className={"card"}>
                    <div className={"-header"}></div>
                    <div className={"-content"}>
                        <ArticleForm />
                    </div>
                </div>
            </section>
        </HeaderAdmin>
    )
}