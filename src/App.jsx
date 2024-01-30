import { useState } from 'react'
import './App.css'
import Nav from "./components/Nav.jsx";
import HomePage from "./pages/HomePage.jsx";

const MenuToggler = () => {
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
        setShowMenu(prevState => !prevState);
    };
    return (
        <div className={'md:absolute md:right-10'}>
            <ul className={`menu ${showMenu ? 'bg-gradient-to-t from-neutral-100 to-[#BFD8AF]' : 'bg-transparent'} rounded-t-none rounded-xl flex flex-col md:flex-row md:items-center items-center z-[-10] md:z-auto md:static absolute w-5/12 right-0 md:w-auto md:py-0 py-2 md:pl-0 pl-7 md:opacity-100 top-[80px] ${showMenu ? 'opacity-100 right-[0px]' : 'opacity-0 right-[-100px]'} transition-all ease-out duration-300`}>
                <li className="cursor-pointer mx-2 my-4 md:my-0">
                    <a href="/login"
                       className="text-neutral-200 text-xl bg-blue-500 hover:bg-gray-600 rounded-3xl px-6 py-1 md:duration-300">
                        Login
                    </a>
                </li>
                <li className="cursor-pointer mx-2 my-4 md:my-0">
                    <a href="/register"
                       className="text-neutral-200 text-xl bg-blue-500 hover:bg-gray-600 rounded-3xl px-6 py-1 md:duration-300">
                        Register
                    </a>
                </li>
            </ul>

            <button
                name="menu"
                className={`text-3xl text-neutral-800 cursor-pointer mx-2 md:hidden block button-icon ${showMenu ? 'rotate' : ''}`}
                onClick={toggleMenu}
            >
                {showMenu ? (
                    <i className="fas fa-times"></i>
                ) : (
                    <i className="fas fa-bars"></i>
                )}
            </button>
        </div>

    )
}

function App() {
    return (
        <>
            <nav className="py-3.5 px-10 bg-[#BFD8AF] z-[20] shadow sticky md:flex md:items-center md:justify-between">
                <div className="flex justify-between items-center">
                    <a href="/">
                    <span className={"text-3xl flex py-2 cursor-pointer text-neutral-800"}><img
                        className={"w-8 mr-2 inline-block"}
                        src="https://cdn-icons-png.flaticon.com/256/10867/10867526.png"/>AutoMüük</span>
                    </a>

                <MenuToggler/>
            </div>
            </nav>
            <Nav/>
            <HomePage/>
        </>
    )
}

export default App;