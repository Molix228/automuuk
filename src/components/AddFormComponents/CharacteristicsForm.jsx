import React, {useState} from 'react';

const CharacteristicsForm = ({  onPrevStep, onNextStep, onCharacteristicChange }) => {

    const specs = {
        types: ['Sedan', 'Coupe', 'Touring', 'Hatchback', 'SUV', 'Minivan', 'Pickup', 'Cabrio'],
        axles: ['Front', 'Back', '4x4'],
        years: Array.from({ length: 75 }, (_, i) => (new Date().getFullYear() - i).toString()),
        colors: ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Gray', 'Silver', 'Gold', 'Brown', 'Orange', 'Pink', 'Turquoise', 'Beige'],
        price: []
    }

    const [selectedType, setSelectedType] = useState(null);
    const [selectedAxle, setSelectedAxle] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);

    const handleTypeChange = (type) => {
        setSelectedType(type);
        onCharacteristicChange('type', type);
        setSelectedAxle(null)
    };

    const handleAxleChange = (axle) => {
        setSelectedAxle(axle);
        onCharacteristicChange('axle', axle);
        setSelectedYear(null)
    }

    const handleYearChange = (year) => {
        setSelectedYear(year);
        onCharacteristicChange('year', year);
        setSelectedColor(null)
    }

    const handleColorChange = (color) => {
        setSelectedColor(color);
        onCharacteristicChange('color', color);
        setSelectedPrice(null);
    }

    const handlePriceChange = (price) => {
        setSelectedPrice(price);
        onCharacteristicChange('price', price);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onNextStep();
        }
    };

    return (
        <div className={"flex flex-col w-full justify-center items-center"} onKeyDown={handleKeyDown}>
            <h2 className={"text-xl md:text-2xl"}>Specs & Other</h2>
            <div className={"w-2/4"}>
                <label className="block text-lg md:text-xl text-neutral-700 mt-2 mb-2 font-bold">Type</label>
                <select
                    className={"border rounded-xl px-5 py-2 w-full text-center font-bold text-lg"}
                    value={selectedType || ""}
                    onChange={(e) => handleTypeChange(e.target.value)}
                >
                    <option value="">------</option>
                    {specs.types.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                <label className="block text-lg md:text-xl text-neutral-700 mt-2 mb-2 font-bold">Axle</label>
                <select
                    className={"border rounded-xl px-5 py-2 w-full text-center font-bold text-lg"}
                    value={selectedAxle || ""}
                    onChange={(e) => handleAxleChange(e.target.value)}
                >
                    <option value="">------</option>
                    {specs.axles.map((axle) => (
                        <option key={axle} value={axle}>
                            {axle}
                        </option>
                    ))}
                </select>
                <label className="block text-lg md:text-xl text-neutral-700 mt-2 mb-2 font-bold">Year</label>
                <select
                    className={"border rounded-xl px-5 py-2 w-full text-center font-bold text-lg"}
                    value={selectedYear || ""}
                    onChange={(e) => handleYearChange(e.target.value)}
                >
                    <option value="">------</option>
                    {specs.years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>

                <label className="block text-lg md:text-xl text-neutral-700 mt-2 mb-2 font-bold">Color</label>
                <select
                    style={{
                        borderBottomLeftRadius: selectedColor ? '0' : '0.75rem',
                        borderBottomRightRadius: selectedColor ? '0' : '0.75rem',
                    }}
                    className={"border rounded-xl px-5 py-2 w-full text-center font-bold text-lg"}
                    value={selectedColor || ""}
                    onChange={(e) => handleColorChange(e.target.value)}
                >
                    <option value="">------</option>
                    {specs.colors.map((color) => (
                        <option key={color} value={color}>
                            {color}
                        </option>
                    ))}
                </select>
                {selectedColor && (
                    <div
                        className="w-full h-6 rounded-b-xl border border-black"
                        style={{backgroundColor: selectedColor.toLowerCase()}}
                    ></div>
                )}
                <label className="block text-lg md:text-xl text-neutral-700 mt-2 mb-2 font-bold">Price</label>
                <input
                    className={"border rounded-xl px-5 py-2 w-full text-center font-mono text-lg"}
                    type="number"
                    value={selectedPrice || ""}
                    onChange={(e) => handlePriceChange(e.target.value)}
                />
            </div>

            <div className={"flex flex-col md:flex-row justify-between w-full mt-10"}>
                <button onClick={onPrevStep}
                        className={"m-2 bg-blue-500 w-full md:w-1/4 h-10 text-white rounded-xl font-semibold"}>Previous
                    Step
                </button>

                <button onClick={onNextStep}
                        className={"m-2 bg-blue-500 w-full md:w-1/4 h-10 text-white rounded-xl font-semibold"}>Next
                </button>
            </div>
        </div>
    );
};

export default CharacteristicsForm;
