import React, { useState } from 'react';

const Nav = () => {
    const [showCategories, setShowCategories] = useState(false);

    return (
        <div className="w-full md:w-full min-h-full absolute z[1]">
            <ul className={`categories gap-6 p-4 bg-[#BFD8AF] text-xl md:text-xl rounded-br-3xl rounded-bl-3xl md:rounded-br-3xl md:rounded-bl-none pt-10 ${showCategories ? 'opacity-100 top-0' : 'opacity-0 top-[-400px]'} transition-all duration-500 ease-in-out flex flex-col items-center justify-center z-[1] absolute w-full md:w-3/6`}>
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
                className={`menuBtn absolute transition-all duration-700 z-[10] ${showCategories ? 'translate-x-full' : 'translate-x-0'} text-2xl left-0 text-neutral-200 bg-[rgb(97,175,60)] rounded-t-none rounded-full w-3/6 h-8`}>
                Menu
            </button>
        </div>
    );
}

export default Nav;
