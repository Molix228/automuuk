import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import Swal from "sweetalert2";

const RegisterForm = () => {
    const navigate = useNavigate();

    // Form
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        email: '',
    });
    const handleFormChange = (fieldName, value) => {
        setUserData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: value,
        }));
    };

    const [reCaptcha, setReCaptcha] = useState(null);
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        email: '',
        recaptcha: '',
        form: '',
    });

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isStrongPassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const isUsernameValid = (username) => {
        const usernameRegex = /^[a-zA-Z0-9]{2,}$/;
        return usernameRegex.test(username);
    };

    const isFormValid = () => {
        return (
            isUsernameValid(userData.username.trim()) &&
            userData.password.trim() !== '' &&
            userData.email.trim() !== '' &&
            isValidEmail(userData.email.trim()) &&
            isStrongPassword(userData.password.trim()) &&
            reCaptcha
        );
    };

    const handleRegistration = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!userData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (!isUsernameValid(userData.username.trim())) {
            newErrors.username = 'Username should contain at least 2 alphanumeric characters';
        } else {
            newErrors.username = ''; // Очистить ошибку, если поле заполнено и корректно
        }

        if (!userData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (!isStrongPassword(userData.password.trim())) {
            newErrors.password = 'Password should be at least 8 characters long with 2 digits and 1 uppercase letter';
        } else {
            newErrors.password = ''; // Очистить ошибку, если поле заполнено корректно
        }

        if (!userData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!isValidEmail(userData.email.trim())) {
            newErrors.email = 'Invalid email format';
        } else {
            newErrors.email = ''; // Очистить ошибку, если поле заполнено корректно
        }

        if (!reCaptcha) {
            newErrors.recaptcha = 'Please complete the reCAPTCHA';
        } else {
            newErrors.recaptcha = ''; // Очистить ошибку, если капча пройдена
        }

        if (Object.values(newErrors).every((value) => value === '')) {
            // Если все ошибки пусты, то форма валидна
            setErrors({ ...newErrors, form: '' });
        } else {
            // Иначе, есть невалидные данные
            setErrors({ ...newErrors, form: 'Please fill in all required fields correctly' });
            return;
        }

        try {
            const formDataObj = new FormData();
            Object.entries(userData).forEach(([key, value]) => {
                formDataObj.append(key, value);
            });

            console.log('User Data: ', formDataObj);

            for (const pair of formDataObj.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            const response = await axios.post('https://api-services-ubw8.onrender.com/api/users/register', formDataObj);

            if (response.status === 200) {
                console.log('User added successfully!');
                Swal.fire({
                    title: "Good job!",
                    text: "You was successfully registered!",
                    icon: "success"
                });
                setTimeout(()=>{
                    navigate('/login');
                }, 2000)
            } else {
                console.error('Error submitting form: ', response.statusText);
            }
        } catch (error) {
            console.error('Something went wrong!', error);
        }
    };

    return (
        <div className={'content max-w-screen h-screen pt-10 relative pb-20 flex justify-center items-center'}>
            <div className={'w-1/2 h-3/4 bg-gray-600/95 border-2 border-gray-400/50 drop-shadow-2xl rounded-xl flex flex-col items-center justify-center'}>
                <form className={'w-full flex flex-col items-center gap-8'}>
                    <h1 className={'text-3xl text-white font-mono underline underline-offset-8'}>Registration</h1>

                    <input
                        placeholder={'Username'}
                        type="text"
                        onChange={(e) => handleFormChange('username', e.target.value)}
                        className={'w-1/2 h-10 rounded-full mx-auto text-center'}
                    />
                    {errors.username && <p className="text-red-500">{errors.username}</p>}

                    <input
                        placeholder={'Password'}
                        type="password"
                        onChange={(e) => handleFormChange('password', e.target.value)}
                        className={'w-1/2 h-10 rounded-full mx-auto text-center'}
                    />
                    {errors.password && <p className="text-red-500">{errors.password}</p>}

                    <input
                        placeholder={'example@mail.com'}
                        type="email"
                        onChange={(e) => handleFormChange('email', e.target.value)}
                        className={'w-1/2 h-10 rounded-full mx-auto text-center'}
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}

                    <ReCAPTCHA sitekey={'6LdsxYkpAAAAAGxEjLQ2A4Ll4nV62sJ_Mz37sRlK'} onChange={(val) => setReCaptcha(val)} />
                    {errors.recaptcha && <p className="text-red-500">{errors.recaptcha}</p>}

                    {errors.form && <p className="text-red-500">{errors.form}</p>}

                    <button
                        disabled={!isFormValid()}
                        onClick={handleRegistration}
                        className={`w-1/3 h-10 transition-all duration-500 ${
                            !isFormValid() ? 'bg-green-900/80 cursor-not-allowed' : 'bg-green-600 scale-125 hover:bg-green-600/70'
                        } text-white font-semibold rounded-full`}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;