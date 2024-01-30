import React, { useState } from 'react';

const Nav = () => {
    const [showCategories, setShowCategories] = useState(false);

    return (
        <div className="w-3/6 min-h-full absolute z-[10]">
            <ul className={`categories gap-6 p-4 bg-[#BFD8AF] text-xl md:text-xl rounded-br-3xl pt-10 ${showCategories ? 'flex' : 'hidden'} flex-col items-center justify-center z-[1] absolute w-full`}>
                <li className="text-center bg-[#B2CD7D] transition duration-200 rounded-full px-4 md:px-10 hover:bg-[#A2CD5D]">
                    <a href="#" className="text-neutral-800 text-l">New</a>
                </li>
                <li className="text-center bg-[#B2CD7D] transition duration-200 rounded-full px-4 md:px-10 hover:bg-[#A2CD5D]">
                    <a href="#" className="text-neutral-800 text-l px-6 py-1">Used</a>
                </li>
                <li className="text-center bg-[#B2CD7D] transition duration-200 rounded-full px-4 md:px-10 hover:bg-[#A2CD5D]">
                    <a href="#" className="text-neutral-800 text-l px-6 py-1 ">Offers</a>
                </li>
                <li className="text-center bg-[#B2CD7D] transition duration-200 rounded-full px-4 md:px-10 hover:bg-[#A2CD5D]">
                    <a href="#" className="text-neutral-800 text-l px-6 py-1 ">Comparison</a>
                </li>
                <li className="text-center bg-[#B2CD7D] transition duration-200 rounded-full px-4 md:px-10 hover:bg-[#A2CD5D]">
                    <a href="#" className="text-neutral-800 text-l px-6 py-1 ">Tips</a>
                </li>
                <li className="text-center bg-[#B2CD7D] transition duration-200 rounded-full px-4 md:px-10 hover:bg-[#A2CD5D]">
                    <a href="#" className="text-neutral-800 text-l px-6 py-1 ">Services & Repairs</a>
                </li>
            </ul>
            <button
                onClick={() => setShowCategories(prev => !prev)}
                className={`menuBtn absolute transition-all duration-700 z-[10] ${showCategories ? 'translate-x-full' : 'translate-x-0'} text-2xl left-0 text-neutral-200 bg-[rgb(97,175,60)] rounded-t-none rounded-full w-full h-8`}>
                Menu
            </button>
        </div>
    );
}

export default Nav;
