import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function HeaderAdmin(props) {

    const [isLogged, setIsLogged] = useState(true)

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.setItem("token", "")
        setIsLogged(false)
    }

    return (
        <>
            {!isLogged && (
                <Navigate to={"/login"} />
            )}

            <div className={"page-admin"}>
                <div className={"page-header"}>
                    <img className={"menu-img"} src={`${window.location.origin}/content/img/logo-autocar.png`} alt={""} />

                    <nav className={"menu-horizontal"}>
                        <li><Link to={"/admin"}>Home</Link></li>
                        <li><Link to={"/admin/makers"}>Makers</Link></li>
                        <li><Link to={"/admin/vehicles"}>Vehicles</Link></li>
                        <li><Link to={"/admin/vehicle-types"}>Vehicle Types</Link></li>
                        <li><Link to={"/admin/consumptions"}>Consumptions</Link></li>
                        <li><Link to={"/admin/characteristics"}>Characteristics</Link></li>
                        <li><Link to={"/admin/fuels"}>Fuels</Link></li>
                        <li><Link to={"/admin/fuels-history"}>Fuels Histories</Link></li>
                        <li><Link to={"/admin/blog"}>Articles</Link></li>
                        <li><Link to={"/admin/testimonials"}>Testimonials</Link></li>
                        <li><Link to={"/admin/newsletters"}>Newsletters</Link></li>
                        <li><Link to={"#logout"} onClick={(e) => handleLogout(e)}>Logout</Link></li>
                    </nav>
                </div>
                <div className={"page-content"}>
                    <div className={"page-menu"}>
                        <Link className={"link-avatar"} to={"/admin/profile"}>
                            <div className={"avatar-infos"}>
                                <span>Garry ALMEIDA</span>
                                <span>Administrator</span>
                            </div>
                            <div className={"avatar-img"}>
                                <img src={`${window.location.origin}/content/img/avatar.jpeg`} alt="" />
                            </div>
                        </Link>
                    </div>
                    <div className={"page-wrapper"}>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}