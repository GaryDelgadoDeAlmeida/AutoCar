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
import Brands from './screens/user/Brands';
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
import AdminBrands from "./screens/admin/Brands";
import AdminBrand from "./screens/admin/Brand";
import AdminBrandSingle from "./screens/admin/BrandSingle";
import AdminVehicles from "./screens/admin/Vehicles";
import AdminVehicle from "./screens/admin/Vehicle";
import AdminVehicleType from "./screens/admin/VehicleType";
import AdminFuels from "./screens/admin/Fuels";
import AdminFuel from "./screens/admin/Fuel";
import AdminFuelSingle from "./screens/admin/FuelSingle";
import AdminFuelsHistory from "./screens/admin/FuelsHistory";
import AdminArticles from "./screens/admin/Articles";
import AdminArticle from "./screens/admin/Article";
import AdminArticleNew from "./screens/admin/ArticleNew";

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
                <Route path={"/brands"} element={<Brands />} />
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
                <Route path={"/admin/vehicles/add"} element={<AdminHome />} />
                <Route path={"/admin/vehicle/:vehicleID"} element={<AdminVehicle />} />
                <Route path={"/admin/vehicle-types"} element={<AdminVehicleType />} />
                <Route path={"/admin/brands"} element={<AdminBrands />} />
                <Route path={"/admin/brands/add"} element={<AdminBrand />} />
                <Route path={"/admin/brand/:brandID"} element={<AdminBrandSingle />} />
                <Route path={"/admin/fuels"} element={<AdminFuels />} />
                <Route path={"/admin/fuels/add"} element={<AdminFuel />} />
                <Route path={"/admin/fuel/:fuelID"} element={<AdminFuelSingle />} />
                <Route path={"/admin/fuels-history"} element={<AdminFuelsHistory />} />
                <Route path={"/admin/blog"} element={<AdminArticles />} />
                <Route path={"/admin/blog/add"} element={<AdminArticleNew />} />
                <Route path={"/admin/blog/:blogID"} element={<AdminArticle />} />
                
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