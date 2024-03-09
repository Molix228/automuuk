import React, {useEffect, useState} from 'react';
import './HomePage.css'
import AddCarForm from "../components/AddCarForm.jsx";
import HotDeals from "../components/HotDeals.jsx";
import CarSearch from "../components/CarSearch.jsx";
import Headroom from "react-headroom/src";
const HomePage = () => {

    return (
        <div className={"w-full min-h-screen relative"}>
            <div className={"content max-w-screen h-screen pt-10 relative pb-20 flex justify-center items-center"}>
                <CarSearch/>
            </div>
            <div className={"bg-blue-300 max-w-screen h-auto p-10 relative text-center"}>
                <HotDeals/>
            </div>
        </div>
    );
};

export default HomePage;