import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CarSearch = () => {
    const [carData, setCarData] = useState({
        brand: "",
        model: "",
        type: "",
        axle: "",

    });

    const brands = {
        'Toyota': 'src/brand_icons/toyota_icon.png',
        'Volkswagen': 'src/brand_icons/volkswagen_icon.png',
        'Ford': 'src/brand_icons/ford_icon.png',
        'Skoda': 'src/brand_icons/skoda_icon.png',
        'Volvo': 'src/brand_icons/volvo_icon.png',
        'BMW': 'src/brand_icons/bmw_icon.png',
        'Mercedes-Benz': 'src/brand_icons/mercedes_icon.png',
        'Audi': 'src/brand_icons/audi_icon.png',
        'Nissan': 'src/brand_icons/nissan_icon.png',
        'Mazda': 'src/brand_icons/mazda_icon.png',
    };

    useEffect(() => {
        axios.get('https://api-services-ubw8.onrender.com/api/cars')
            .then(response => {
                setCarData(response.data.carData);
            })
            .catch(error => console.log("Error fetching data: ", error));
    }, []);

    const [searchResult, setSearchResult] = useState(null);

    const handleBrandAndModelSelect = (brand, model) => {
        setSearchResult(null);
        searchCarsInDatabase({ brand, model });
    };

    const searchCarsInDatabase = (searchParams) => {
        axios.post('https://api-services-ubw8.onrender.com/api/cars', searchParams)
            .then(response => {
                setSearchResult(response.data);
            })
            .catch(error => console.log('Error searching data: ', error));
    };

    const handleNextStep = () => {
        if (searchResult) {
            console.log('Found cars', searchResult);
        } else {
            console.log('No cars found. ');
        }
    };

    return (
        <div className={"w-4/5 h-fit gap-5 bg-white/70 mt-10 p-5 rounded-xl grid grid-cols-5 items-center text-center"}>
            <h1 className={"text-3xl col-span-5 mb-4 font-semibold"}>Select Brand:</h1>
            {Object.keys(brands).map((brand, index) => (
                <div key={index} className={"w-52 h-52 bg-white/50 hover:bg-white/90 rounded-xl"}>
                    <img src={brands[brand]} alt={brand} className="w-full h-full object-contain p-8"/>
                </div>
            ))}
        </div>
    );
};

export default CarSearch;
