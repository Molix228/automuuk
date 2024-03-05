import { useState } from 'react';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav.jsx';
import HomePage from './pages/HomePage.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import LoginForm from './components/LoginForm.jsx';

const MenuItem = ({ to, children, onClick }) => (
    <li className="cursor-pointer mx-2 my-4 md:my-0">
        <Link to={to} onClick={onClick}>
            <button className="text-neutral-200 text-xl bg-blue-500 hover:bg-gray-600 rounded-3xl px-6 py-1 md:duration-300">
                {children}
            </button>
        </Link>
    </li>
);

const MenuToggler = ({ isLoggedIn }) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu((prevShowMenu) => !prevShowMenu);
    };

    const closeMenu = () => {
        setShowMenu(false)
    }

    return (
        <div className={'md:absolute md:right-10'}>
            <ul className={`menu ul ${showMenu ? 'bg-white/30 backdrop-blur-md shadow-2xl' : 'bg-transparent'} max-w-max rounded-t-none rounded-xl flex flex-col md:flex-row md:items-center items-center z-[10] md:z-auto md:static absolute right-0 md:w-auto md:py-0 py-2 md:pl-0 pl-7 md:opacity-100 top-[80px] ${showMenu ? 'opacity-100 right-[0px] md:right-0' : 'opacity-0 right-[-100px] md:right-0'} transition-all ease-out duration-500`}>
                {!isLoggedIn ? (
                    <>
                        <MenuItem to="/login" onClick={closeMenu}>Login</MenuItem>
                        <MenuItem to="/register" onClick={closeMenu}>Register</MenuItem>
                    </>
                ) : (
                    <>

                        <MenuItem to="/sell-auto" onClick={closeMenu}>Sell Auto</MenuItem>
                        <MenuItem to="/favourites" onClick={closeMenu}>💛 Favourites ️</MenuItem>
                    </>
                )}
            </ul>

            <button
                name="menu"
                className={`text-3xl text-neutral-800 cursor-pointer mx-2 md:hidden block button-icon ${showMenu ? 'rotate' : ''}`}
                onClick={toggleMenu}
            >
                {showMenu ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
            </button>
        </div>
    );
};

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false); // Установите значение в зависимости от состояния входа пользователя

    const handleLogin = () => {
        setLoggedIn(true);
    }

    return (
        <Router>
            <>
                <nav
                    className="py-3.5 px-10 bg-[#BFD8AF] z-[50] shadow sticky md:flex md:items-center md:justify-between">
                    <div className="flex justify-between items-center">
                        <Link to="/">
              <span className={"text-3xl flex py-2 cursor-pointer text-neutral-800"}>
                <img className={"w-8 mr-2 inline-block"} src="https://cdn-icons-png.flaticon.com/256/10867/10867526.png"
                     alt="AutoMüük"/>
                AutoMüük
              </span>
                        </Link>
                        <MenuToggler isLoggedIn={isLoggedIn}/>
                    </div>
                </nav>
                <Nav/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                </Routes>
            </>
        </Router>
    );
}

export default App;