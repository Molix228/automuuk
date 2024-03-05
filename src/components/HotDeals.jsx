import React, { useState, useEffect } from 'react';
import axios from 'axios';
import header from "react-modal-image/lib/Header.js";

const HotDeals = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        // Отправляем GET-запрос к серверу с использованием Axios
        axios.get('https://api-services-ubw8.onrender.com/api/cars')
            .then(response => {
                // Обновляем состояние компонента с данными о машинах
                setCars(response.data.cars);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []); // Пустой массив зависимостей гарантирует выполнение эффекта только при монтировании компонента

    return (
        <div>
            <h1 className={"text-3xl mb-10"}>Hot Deals 🔥</h1>
            <div className={`grid gap-4 mx-2 overflow-hidden sm:grid-cols-2 md:grid-cols-3`}>
                {cars.map(car => (
                    <div
                        className={"p-2.5 gap-2 w-auto h-auto bg-white/50 rounded-xl text-center flex flex-col justify-center"}
                        key={car.id}>
                        <div className={"w-full h-72 overflow-hidden"}>
                            <img
                                src={`https://api-services-ubw8.onrender.com${car.photo}`}
                                alt={`${car.brand} ${car.model}`}
                                className={"w-full h-full rounded-md object-cover"}
                            />
                        </div>
                        <p className={"text-xl text-black-500 font-semibold"}>{car.brand}</p>
                        <p className={"text-xl text-black-500 font-semibold"}>{car.model}</p>
                        <p className={"text-xl text-black font-semibold"}>Price: <span
                            className={"text-blue-500 font-mono"}>{car.price}</span></p>
                        <p className={"text-xl text-black font-semibold"}>Mileage: <span
                            className={"text-blue-500 font-mono"}>{car.mileage}</span></p>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotDeals;