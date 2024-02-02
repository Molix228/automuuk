import React from 'react';
import HotDeals from "../components/HotDeals.jsx";
import AddCarForm from "../components/AddCarForm.jsx";
const HomePage = () => {
    return (
        <div className={"bg-blue-200 w-full min-h-screen relative"}>
            <div className={"max-w-screen h-screen mx-4 pt-10 relative"}>
                <HotDeals/>
                <AddCarForm/>
            </div>
        </div>
    );
};

export default HomePage;