import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import PrivateRessource from "../../hooks/PrivateResources";

export default function Vehicle() {

    const { vehicleID } = useParams()
    if(isNaN(vehicleID)) {
        return <Navigate to={"/vehicles"} />
    }

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/vehicle/${vehicleID}`)

    useEffect(() => {
        load()
    }, [vehicleID])

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-home-2.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Vehicle</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link to={"/"}>Home</Link>
                        <Link to={"/vehicles"}>Vehicles</Link>
                        <span>Vehicle</span>
                    </div>
                </div>
            </section>
            
            <section className={"page-section"}>
                <div className={"page-wrapper"}>
                    <Link className={"btn btn-blue"} to={"/vehicles"}>Return</Link>

                    <div className={"page-vehicle"}>
                        <div className={"-left"}>
                            <h2 className={"page-title"}>Vehicle</h2>
                            <img src={`${window.location.origin}/content/img/`} alt={""} />
                            <div className={"-markup"}>
                                <h1>Non odio dolor ut vero voluptatem. </h1><p>Lorem ipsum dolor sit amet. Qui amet sunt <strong>Eos consequatur</strong> eum eius accusantium eos dignissimos cumque. Aut esse quisquam <em>Id omnis hic ipsa culpa ut eaque voluptas est provident velit</em> id suscipit modi et nisi facere. Ut exercitationem quia eum autem quasi <a href="https://www.loremipzum.com" target="_blank">Ut suscipit ut deleniti nihil non quam cumque et voluptate eligendi</a>. </p><h2>Aut corrupti quia et voluptas porro. </h2><p>Est labore repudiandae eum nesciunt omnis <em>Aut vero qui neque omnis quo laboriosam corrupti sed expedita asperiores</em>. Sed voluptas itaque et recusandae fugiatnon tenetur. </p><ol><li>At praesentium harum ut sint officia ea ducimus ratione sit officia labore. </li><li>Et explicabo omnis qui distinctio repellat sit enim dicta. </li><li>Ut vero beatae sed consequatur sint eum nemo omnis! </li><li>Est dignissimos illum sed dolor provident. </li><li>Qui voluptatem sequi et Quis culpa. </li></ol><ul><li>Sit omnis eveniet vel quibusdam praesentium et suscipit dolor. </li><li>In tempore excepturi qui iste fugiat. </li></ul><blockquote cite="https://www.loremipzum.com">At quod dolore aut ipsam atque sit minima voluptatem sed quidem explicabo rem aperiam perferendis 33 quidem repudiandae. </blockquote><h3>Et possimus sunt et ipsum commodi? </h3><p>Ut ratione sunt <a href="https://www.loremipzum.com" target="_blank">Nam sint</a> et quia dicta. Aut omnis dignissimoseum sunt non obcaecati iure. </p><dl><dt><dfn>Vel nostrum dignissimos. </dfn></dt><dd>Et sint temporibus sed unde rerum qui quia natus. </dd><dt><dfn>Qui eligendi excepturi. </dfn></dt><dd>Et voluptas illum vel quos inventore. </dd><dt><dfn>A impedit Quis qui architecto delectus. </dfn></dt><dd>Sit adipisci iure et earum quia id alias voluptatem hic dicta nihil. </dd></dl>
                            </div>
                        </div>
                        <div className={"-right"}></div>
                    </div>
                </div>
            </section>
        </Header>
    )
}