import React from 'react';
import HotDeals from "../components/HotDeals.jsx";
const HomePage = () => {
    return (
        <div className={"bg-blue-200 w-full min-h-screen relative"}>
            <div className={"max-w-screen h-screen mx-4 pt-10 relative"}>
                <HotDeals/>
            </div>
        </div>
    );
};

export default HomePage;