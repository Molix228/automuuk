import React, {useEffect, useState} from 'react';
import BrandSelection from "./AddFormComponents/BrandSelection.jsx";
import axios from "axios";
import brandSelection from "./AddFormComponents/BrandSelection.jsx";

const CarSearch = () => {

    const [carData, setCarData] = useState(null)

    useEffect(() => {
        axios.get('https://api-services-ubw8.onrender.com/api/cars')
            .then(response => {
                response.data.carData
            })
            .catch(error => console.log("Error fetching data: ", error))
    }, []);

    const [searchResult, setSearchResult] = useState(null);

    const handleBrandAndModelSelect = (brand, model) => {
        setSearchResult(null)
        searchCarsInDatabase({brand, model});
    };

    const searchCarsInDatabase = (searchParams) => {
        axios.post('https://api-services-ubw8.onrender.com/api/cars', searchParams)
            .then(response => {
                setSearchResult(response.data);
            })
            .catch(error => console.log('Error searching data: ', error));
    };

    const handleNextStep = () => {
        if(searchResult){
            console.log('Found cars', searchResult);

        }else{
            console.log('No cars found. ');
        }
    }

    return (
        <div className={"w-4/5 h-full bg-white/70 mt-10 rounded-xl flex flex-col items-center gap-5" }>
            <div className={"w-3/5 mt-10"}>
                <BrandSelection
                    onSelectBrandAndModel={handleBrandAndModelSelect}
                    onNextStep={handleNextStep}
                />
            </div>
        </div>
    );
};

export default CarSearch;