import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import LoginForm from "../../forms/LoginForm";

export default function Login() {

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-home-2.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Login</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link to={"/"}>Home</Link>
                        <span>Login</span>
                    </div>
                </div>
            </section>
            <section className={"page-section"}>
                <div className={"page-wrapper"}>
                    <div className={"card"}>
                        <div className={"-header"}>
                            <label className={"-title"}>Log-in to your account</label>
                        </div>
                        <div className={"-content"}>
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </section>
        </Header>
    )
}