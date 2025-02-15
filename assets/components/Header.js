import React from "react";
import { Link } from "react-router-dom";
import NewsletterForm from "../forms/NewsletterForm";

export default function Header(props) {

    return (
        <div className={"page"}>
            <div className={"page-header"}>
                <div className={"header-wrapper"}>
                    <div className={"header-desktop"}>
                        <Link className={"-left"} to={"/"}>
                            <img className={"logo"} src={`${window.location.origin}/content/img/logo-autocar.png`} alt={"Logo"} />
                        </Link>
                        <div className={"-right"}>
                            <div className={"menu"}>
                                <Link to={"/"}>Home</Link>
                                <Link to={"/about"}>About</Link>
                                <Link to={"/makers"}>Makers</Link>
                                <Link to={"/vehicles"}>Vehicles</Link>
                                <Link to={"/fuels"}>Fuels</Link>
                                <Link to={"/fuel-simulator"}>Fuel Simulator</Link>
                                <Link to={"/blog"}>Blog</Link>
                                <Link to={"/contact"}>Contact</Link>
                            </div>
                        </div>
                    </div>

                    <div className={"header-mobile"}>
                        <Link className={"-left"} to={"/"}>
                            <img className={"logo"} src={`${window.location.origin}/content/img/logo-autocar.png`} alt={"Logo"} />
                        </Link>
                        <div className={"-right"}>
                            <input type={"checkbox"} id={"menubars"} hidden />
                            <label className={"labelBars"} htmlFor={"menubars"}>
                                <img src={`${window.location.origin}/content/svg/bars.svg`} alt={""} />
                            </label>

                            <div className={"mobile-menu"}>
                                <div className={"mobile-menu-widget"}>
                                    <label className={"labelBars"} htmlFor={"menubars"}>
                                        <img src={`${window.location.origin}/content/svg/bars.svg`} alt={""} />
                                    </label>
                                    <div className={"menu"}>
                                        <li className={"-item"}><Link to={"/"}>Home</Link></li>
                                        <li className={"-item"}><Link to={"/about"}>About</Link></li>
                                        <li className={"-item"}><Link to={"/makers"}>Makers</Link></li>
                                        <li className={"-item"}><Link to={"/vehicles"}>Vehicles</Link></li>
                                        <li className={"-item"}><Link to={"/fuels"}>Fuels</Link></li>
                                        <li className={"-item"}><Link to={"/fuel-simulator"}>Fuel Simulator</Link></li>
                                        <li className={"-item"}><Link to={"/blog"}>Blog</Link></li>
                                        <li className={"-item"}><Link to={"/contact"}>Contact</Link></li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"page-content"}>
                {props.children}
            </div>
            <div className={"page-footer"}>
                <div className={"footer-menu"}>
                    <div className={"footer-menu-wrapper"}>
                        <div className={"links-grid"}>
                            <div className={"links-col"}>
                                <div className={"-header"}>
                                    <img src={`${window.location.origin}/content/img/logo-autocar-footer.png`} alt={"Logo"} />
                                </div>
                                <div className={"-content"}>
                                    <div className={"social-links"}>
                                        <a className={"-link"} href={"#"} target={"_blank"}><img src={`${window.location.origin}/content/svg/facebook-white.svg`} alt={"Facebook"} /></a>
                                        {/* <a className={"-link"} href={"#"} target={"_blank"}><img src={`${window.location.origin}/content/svg/instagram-white.svg`} alt={"instagram"} /></a> */}
                                        <a className={"-link"} href={"#"} target={"_blank"}><img src={`${window.location.origin}/content/svg/twitter-white.svg`} alt={"twitter"} /></a>
                                        <a className={"-link"} href={"#"} target={"_blank"}><img src={`${window.location.origin}/content/svg/linkedin-white.svg`} alt={"linkedin"} /></a>
                                    </div>
                                </div>
                            </div>
                            <div className={"links-col"}>
                                <div className={"-header"}>
                                    <label>Newsletters</label>
                                </div>
                                <div className={"-content"}>
                                    <NewsletterForm />
                                </div>
                            </div>
                            <div className={"links-col"}>
                                <div className={"-header"}>
                                    <label>Quick links</label>
                                </div>
                                <div className={"-content"}>
                                    <li><Link to={"/"}>Home</Link></li>
                                    <li><Link to={"/about"}>About us</Link></li>
                                    <li><Link to={"/makers"}>Makers</Link></li>
                                    <li><Link to={"/fuels"}>Fuels</Link></li>
                                    <li><Link to={"/fuel-simulator"}>Fuel Simulator</Link></li>
                                    <li><Link to={"/vehicles"}>Vehicles</Link></li>
                                    <li><Link to={"/contact"}>Contact us</Link></li>
                                </div>
                            </div>
                            <div className={"links-col"}>
                                <div className={"-header"}>Others links</div>
                                <div className={"-content"}>
                                    <li><Link to={"/faq"}>FAQ</Link></li>
                                    <li><Link to={"/policy"}>Policy</Link></li>
                                    <li><Link to={"/cookie"}>Cookie</Link></li>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"footer-copyright"}>
                    <p>
                        Copyright {(new Date()).getFullYear()} &minus; All right reserved<br/>
                        Designed & Realised by <a href={"https://garry-almeida.com"} target={"_blank"} rel={"no-referer"}>Garry ALMEIDA</a>
                    </p>
                </div>
            </div>
        </div>
    )
}