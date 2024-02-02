import React, { useState, useRef } from 'react';
import axios from 'axios';

const AddCarForm = () => {
    const [carData, setCarData] = useState({
        brand: '',
        model: '',
        type: '',
        year: undefined,
        price: undefined,
        color: '',
        weight: undefined,
        mileage:undefined,
        specs: '',
        photo: '',
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const inputRef = useRef(null);

    const brands = ['Lexus', 'Toyota', 'Honda', 'BMW', 'Mercedes', 'Ford'];
    const types = ['Sedan', 'SUV', 'Truck', 'Convertible', 'Coupe'];
    const colors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Silver'];

    const modelsByBrand = {
        Lexus: ['GS 300', 'IS 220', 'IS 250'],
        Toyota: ['Aventis', 'Camry', 'Corolla'],
        Honda: ['CR-V', 'HR-V', 'Accord'],
        BMW: ['X5', 'X3', '5 series', '3 series'],
        Mercedes: ['C klass', 'S klass', 'E klass', 'B klass'],
        Ford: ['Mustang', 'Mondeo', 'Focus', 'F150'],
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'brand') {
            setCarData({ ...carData, brand: value, model: '' });
        } else if (name === 'year' || name === 'price' || name === 'weight' || name === 'mileage') {
            setCarData({ ...carData, [name]: value !== '' ? parseInt(value, 10) : '' });
        } else {
            setCarData({ ...carData, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setSelectedFile(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const validateForm = () => {

        if (
            !carData.brand ||
            !carData.model ||
            !carData.type ||
            carData.year !== undefined || // Обновлено
            carData.price !== undefined || // Обновлено
            !carData.color
        ) {
            setError('Please fill in all required fields.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append('brand', carData.brand);
            formData.append('model', carData.model);
            formData.append('type', carData.type);
            formData.append('year', carData.year);
            formData.append('price', carData.price);
            formData.append('color', carData.color);
            formData.append('weight', carData.weight);
            formData.append('mileage', carData.mileage);
            formData.append('specs', carData.specs);
            formData.append('photo', selectedFile);

            const response = await axios.post('https://flask-auto-app-0eec456208d8.herokuapp.com/api/cars', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Response:', response.data);
            setSuccessMessage('Data successfully submitted!');
            // Очистим форму
            setCarData({
                brand: '',
                model: '',
                type: '',
                year: undefined,
                price: undefined,
                color: '',
                weight: undefined,
                mileage: undefined,
                specs: '',
                photo: '',
            });
            // Сбросим выбранный файл
            setSelectedFile(null);

        } catch (error) {
            console.error('Sending Data Error:', error);
            setError('Error submitting data. Please try again.');
        }
    };

    return (
        <form
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto bg-white p-8 rounded shadow-md mt-8"
        >
            {error && <div className="text-red-500">{error}</div>}
            {successMessage && <div className="text-green-500">{successMessage}</div>}

            <div className="mb-4">
                <label htmlFor="brand" className="block text-sm font-bold text-gray-600 mb-2">
                    Brand
                </label>
                <select
                    name="brand"
                    value={carData.brand}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                    style={{ backgroundColor: carData.brand ? '#AEE8FF' : '' }}
                >
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                        <option key={brand} value={brand}>
                            {brand}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="model" className="block text-sm font-bold text-gray-600 mb-2">
                    Model
                </label>
                <select
                    name="model"
                    value={carData.model}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                    style={{ backgroundColor: carData.model ? '#AEE8FF' : '' }}
                >
                    <option value="">Select Model</option>
                    {carData.brand &&
                        modelsByBrand[carData.brand].map((model) => (
                            <option key={model} value={model}>
                                {model}
                            </option>
                        ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="type" className="block text-sm font-bold text-gray-600 mb-2">
                    Type
                </label>
                <select
                    name="type"
                    value={carData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                    style={{ backgroundColor: carData.type ? '#AEE8FF' : '' }}
                >
                    <option value="">Select Type</option>
                    {types.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="year" className="block text-sm font-bold text-gray-600 mb-2">
                    Year
                </label>
                <input
                    type="number"
                    value={carData.year !== '' ? carData.year : ''}
                    onChange={handleInputChange}
                    placeholder="Year"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                    style={{backgroundColor: carData.year ? '#AEE8FF' : ''}}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-bold text-gray-600 mb-2">
                    Price
                </label>
                <input
                    type="number"
                    value={carData.price !== '' ? carData.price : ''}
                    onChange={handleInputChange}
                    placeholder="Price"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                    style={{ backgroundColor: carData.price ? '#AEE8FF' : '' }}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="color" className="block text-sm font-bold text-gray-600 mb-2">
                    Color
                </label>
                <select
                    name="color"
                    value={carData.price !== '' ? carData.price : ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                    style={{ backgroundColor: carData.color ? '#AEE8FF' : '' }}
                >
                    <option value="">Select Color</option>
                    {colors.map((color) => (
                        <option key={color} value={color}>
                            {color}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="weight" className="block text-sm font-bold text-gray-600 mb-2">
                    Weight
                </label>
                <input
                    type="number"
                    value={carData.weight !== '' ? carData.weight : ''}
                    onChange={handleInputChange}
                    placeholder="Weight"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                    style={{ backgroundColor: carData.weight ? '#AEE8FF' : '' }}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="mileage" className="block text-sm font-bold text-gray-600 mb-2">
                    Mileage
                </label>
                <input
                    type="number"
                    value={carData.mileage !== '' ? carData.mileage : ''}
                    onChange={handleInputChange}
                    placeholder="Mileage"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                    style={{ backgroundColor: carData.mileage ? '#AEE8FF' : '' }}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="specs" className="block text-sm font-bold text-gray-600 mb-2">
                    Specs
                </label>
                <input
                    type="text"
                    value={carData.specs}
                    name={"specs"}
                    onChange={handleInputChange}
                    placeholder="Specs"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                    style={{ backgroundColor: carData.specs ? '#AEE8FF' : '' }}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="photo" className="block text-sm font-bold text-gray-600 mb-2">
                    Photo
                </label>
                <button
                    type="button"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none"
                    onClick={() => inputRef.current.click()}
                >
                    Load Photo
                </button>
                <input
                    type="file"
                    ref={inputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                />
                {selectedFile && <p className="mt-2">File: {selectedFile.name}</p>}
            </div>
            <div className="mb-4">
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default AddCarForm;