import React, { useState } from 'react';
import BrandSelection from "./AddFormComponents/BrandSelection.jsx";
import CharacteristicsForm from "./AddFormComponents/CharacteristicsForm.jsx";
import MetricValues from "./AddFormComponents/MetricValues.jsx";
import PhotoUpload from "./AddFormComponents/PhotoUpload.jsx";
import DescriptionForm from "./AddFormComponents/DescriptionForm.jsx";
import axios from "axios";

const AddCarForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        type: "",
        axle: "",
        year: "",
        price: "",
        color: "",
        weight: "",
        mileage: "",
        photo: null,
        description: ""
    });

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    }

    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    }

    const handleFormChange = (fieldName, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [fieldName]: value
        }));
    };

    const handlePhotoUpload = (selectedPhotos) => {
        if (selectedPhotos.length > 0 && selectedPhotos[0].file) {
            // Объект содержит поле 'file'
            setFormData((prevFormData) => ({
                ...prevFormData,
                photo: selectedPhotos[0].file
            }));
        } else {
            console.error("Invalid selectedPhotos format");
        }
    }


    const handleSubmit = async () => {
        try {
            const formDataObj = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataObj.append(key, value);
            });

            console.log("Form Data:", formDataObj);
            for (const pair of formDataObj.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }

            const response = await axios.post('https://api-services-ubw8.onrender.com/api/cars', formDataObj);

            if(response.status === 200) {
                console.log("Form submitted successfully!");
                window.location.reload();
            } else {
                console.error('Error submitting form: ', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form: ', error.message);
        }
    }



    return (
        <form
            className="mt-10 w-3/4 md:w-2/4 bg-white/70 rounded-xl flex flex-col items-center justify-center text-center">
            <div className={`h-${currentStep * 1 / 4}/5 w-full p-10`}>
                {currentStep === 1 && <BrandSelection onPrevStep={handlePrevStep} onNextStep={handleNextStep}
                                                      onSelectBrandAndModel={(brand, model) => {
                                                          handleFormChange('brand', brand);
                                                          handleFormChange('model', model);
                                                      }} />}
                {currentStep === 2 && <CharacteristicsForm onPrevStep={handlePrevStep} onNextStep={handleNextStep}
                                                           onCharacteristicChange={(fieldName, value) => handleFormChange(fieldName, value)}/>}
                {currentStep === 3 && <MetricValues onPrevStep={handlePrevStep} onNextStep={handleNextStep}
                                                    onCharacteristicChange={(fieldName, value) => handleFormChange(fieldName, value)}/>}
                {currentStep === 4 &&
                    <PhotoUpload name={"photo"} onPrevStep={handlePrevStep} onNextStep={handleNextStep}
                                 onPhotoSelect={handlePhotoUpload}/>}
                {currentStep === 5 && <DescriptionForm onPrevStep={handlePrevStep} onNextStep={handleNextStep}
                                                       onDescriptionChange={(value) => handleFormChange('description', value)}/>}
            </div>

            {currentStep === 5 && (
                <button type="button" onClick={handleSubmit}
                        className="m-4 bg-blue-500 text-white px-20 py-2 rounded-full font-bold">
                    Add ✅
                </button>
            )}
        </form>
    );
};

export default AddCarForm;