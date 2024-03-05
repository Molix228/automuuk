import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Swal from "sweetalert2";

const LoginForm = ({onLogin}) => {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        usernameOrEmail: '',
        password: '',
    });

    const [isFormValid, setIsFormValid] = useState(false);

    const handleFormChange = (fieldName, value) => {
        setLoginData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: value,
        }));
        checkFormValidity(); // Вызывать при каждом изменении поля
    };

    const checkFormValidity = () => {
        const { usernameOrEmail, password } = loginData;
        setIsFormValid(usernameOrEmail.trim() !== '' && password.trim() !== '');
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://api-services-ubw8.onrender.com/api/users/login', loginData);

            if (response.status === 200) {
                console.log('Login successful!');
                Swal.fire({
                    title: "All set!",
                    text: "You were successfully logged in!",
                    icon: "success",
                });
                onLogin();
                navigate('/');
            } else {
                console.error('Error during login: ', response.statusText);
            }
        } catch (error) {
            console.error('Something went wrong!', error);
        }
    };

    return (
        <div className="content max-w-screen h-screen pt-10 relative pb-20 flex justify-center items-center">
            <div className="w-1/2 h-3/4 bg-gray-600/95 border-2 border-gray-400/50 drop-shadow-2xl rounded-xl flex flex-col items-center justify-center">
                <form className="w-full flex flex-col items-center gap-8">
                    <h1 className="text-3xl text-white font-mono underline underline-offset-8">Login</h1>

                    <input
                        placeholder="Username or Email"
                        type="text"
                        onChange={(e) => handleFormChange('usernameOrEmail', e.target.value)}
                        className="w-1/2 h-10 rounded-full mx-auto text-center"
                    />

                    <input
                        placeholder="Password"
                        type="password"
                        onChange={(e) => handleFormChange('password', e.target.value)}
                        className="w-1/2 h-10 rounded-full mx-auto text-center"
                    />

                    <button
                        onClick={handleLogin}
                        disabled={!isFormValid} // Используйте disabled в зависимости от состояния
                        className={`w-1/3 h-10 ${!isFormValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600/80 hover:bg-blue-600/70'} text-white font-semibold rounded-full`}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;