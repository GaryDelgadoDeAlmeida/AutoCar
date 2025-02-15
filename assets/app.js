/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// User
import Home from './screens/user/Home';
import About from './screens/user/About';
import Makers from './screens/user/Makers';
import Maker from './screens/user/Maker';
import Fuels from './screens/user/Fuels';
import Vehicles from './screens/user/Vehicles';
import Vehicle from './screens/user/Vehicle';
import Faq from './screens/user/Faq';
import Policy from './screens/user/Policy';
import Cookie from './screens/user/Cookie';
import FuelSimulator from './screens/user/FuelSimulator';
import Articles from './screens/user/Articles';
import Article from './screens/user/Article';
import Contact from './screens/user/Contact';
import Login from './screens/user/Login';

// Admin
import AdminHome from "./screens/admin/Home";
import AdminProfile from "./screens/admin/Profile";
import AdminMakers from "./screens/admin/Makers";
import AdminMakerNew from "./screens/admin/MakerNew";
import AdminMakerEdit from "./screens/admin/MakerEdit";
import AdminMakerSingle from "./screens/admin/MakerSingle";
import AdminVehicles from "./screens/admin/Vehicles";
import AdminVehicle from "./screens/admin/Vehicle";
import AdminVehicleNew from "./screens/admin/VehicleNew";
import AdminVehicleEdit from "./screens/admin/VehicleEdit";
import AdminVehicleTypes from "./screens/admin/VehicleTypes";
import AdminVehicleTypeNew from "./screens/admin/VehicleTypeNew";
import AdminConsumptions from "./screens/admin/Consumptions";
import AdminCharacteristics from "./screens/admin/Characteristics";
import AdminFuels from "./screens/admin/Fuels";
import AdminFuelNew from "./screens/admin/FuelNew";
import AdminFuelSingle from "./screens/admin/FuelSingle";
import AdminFuelsHistory from "./screens/admin/FuelsHistory";
import AdminArticles from "./screens/admin/Articles";
import AdminArticle from "./screens/admin/Article";
import AdminArticleNew from "./screens/admin/ArticleNew";
import AdminArticleEdit from "./screens/admin/ArticleEdit";
import AdminNewsletters from "./screens/admin/Newsletters";
import AdminTestimonials from "./screens/admin/Testimonials";
import AdminTestimonial from "./screens/admin/Testimonial";
import AdminTestimonialNew from "./screens/admin/TestimonialNew";
import AdminInboxes from "./screens/admin/Inboxes";
import AdminInbox from "./screens/admin/Inbox";

// Common
import Page404 from "./screens/Page404"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route path={"/"} element={<Home />} />
                <Route path={"/about"} element={<About />} />
                <Route path={"/makers"} element={<Makers />} />
                <Route path={"/maker/:makerID"} element={<Maker />} />
                <Route path={"/fuels"} element={<Fuels />} />
                <Route path={"/vehicles"} element={<Vehicles />} />
                <Route path={"/vehicle/:vehicleID"} element={<Vehicle />} />
                <Route path={"/fuel-simulator"} element={<FuelSimulator />} />
                <Route path={"/blog"} element={<Articles />} />
                <Route path={"/blog/:blogID"} element={<Article />} />
                <Route path={"/contact"} element={<Contact />} />

                {/* Admin */}
                <Route path={"/admin"} element={<AdminHome />} />
                <Route path={"/admin/profile"} element={<AdminProfile />} />
                <Route path={"/admin/vehicles"} element={<AdminVehicles />} />
                <Route path={"/admin/vehicles/add"} element={<AdminVehicleNew />} />
                <Route path={"/admin/vehicle/:vehicleID"} element={<AdminVehicle />} />
                <Route path={"/admin/vehicle/:vehicleID/edit"} element={<AdminVehicleEdit />} />
                <Route path={"/admin/vehicle-types"} element={<AdminVehicleTypes />} />
                <Route path={"/admin/vehicle-types/add"} element={<AdminVehicleTypeNew />} />
                <Route path={"/admin/consumptions"} element={<AdminConsumptions />} />
                <Route path={"/admin/characteristics"} element={<AdminCharacteristics />} />
                <Route path={"/admin/makers"} element={<AdminMakers />} />
                <Route path={"/admin/makers/add"} element={<AdminMakerNew />} />
                <Route path={"/admin/maker/:makerID"} element={<AdminMakerSingle />} />
                <Route path={"/admin/maker/:makerID/edit"} element={<AdminMakerEdit />} />
                <Route path={"/admin/fuels"} element={<AdminFuels />} />
                <Route path={"/admin/fuels/add"} element={<AdminFuelNew />} />
                <Route path={"/admin/fuel/:fuelID"} element={<AdminFuelSingle />} />
                <Route path={"/admin/fuels-history"} element={<AdminFuelsHistory />} />
                <Route path={"/admin/blog"} element={<AdminArticles />} />
                <Route path={"/admin/blog/add"} element={<AdminArticleNew />} />
                <Route path={"/admin/blog/:blogID"} element={<AdminArticle />} />
                <Route path={"/admin/blog/:blogID/edit"} element={<AdminArticleEdit />} />
                <Route path={"/admin/newsletters"} element={<AdminNewsletters />} />
                <Route path={"/admin/testimonials"} element={<AdminTestimonials />} />
                <Route path={"/admin/testimonial/add"} element={<AdminTestimonialNew />} />
                <Route path={"/admin/testimonial/:testimonialID"} element={<AdminTestimonial />} />
                <Route path={"/admin/inboxes"} element={<AdminInboxes />} />
                <Route path={"/admin/inbox/:inboxID"} element={<AdminInbox />} />
                
                {/* Common */}
                <Route path={"/faq"} element={<Faq />} />
                <Route path={"/policy"} element={<Policy />} />
                <Route path={"/cookie"} element={<Cookie />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"*"} element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);