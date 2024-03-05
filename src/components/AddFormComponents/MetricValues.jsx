import React, {useState} from 'react';

const MetricValues = ({  onPrevStep, onNextStep, onCharacteristicChange }) => {

    const [selectedWeight, setSelectedWeight] = useState(null);
    const [selectedMileage, setSelectedMileage] = useState(null);

    const handleWeightChange = (weight) => {
        setSelectedWeight(weight);
        onCharacteristicChange('weight', weight);
        setSelectedMileage(null)
    }

    const handleMileageChange = (mileage) => {
        setSelectedMileage(mileage);
        onCharacteristicChange('mileage', mileage);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onNextStep();
        }
    };

    return (
        <div className={"flex flex-col w-full justify-center items-center"} onKeyDown={handleKeyDown}>
            <h2 className={"text-xl md:text-2xl"}>Metrics</h2>
            <div className={"w-2/4"}>

                <label className="block text-lg md:text-xl text-neutral-700 mt-2 mb-2 font-bold">Weight</label>
                <input
                    className={"border rounded-xl px-5 py-2 w-full text-center font-mono text-lg"}
                    type="number"
                    value={selectedWeight || ""}
                    onChange={(e) => handleWeightChange(e.target.value)}
                />

                <label className="block text-lg md:text-xl text-neutral-700 mt-2 mb-2 font-bold">Mileage</label>
                <input
                    className={"border rounded-xl px-5 py-2 w-full text-center font-mono text-lg"}
                    type="number"
                    value={selectedMileage || ""}
                    onChange={(e) => handleMileageChange(e.target.value)}
                />
            </div>

            <div className={"flex flex-col md:flex-row justify-between w-full mt-10"}>
                <button onClick={onPrevStep}
                        className={"m-2 bg-blue-500 w-full md:w-1/4 h-10 text-white rounded-xl font-semibold"}>
                    Previous Step
                </button>

                <button onClick={onNextStep}
                        className={"m-2 bg-blue-500 w-full md:w-1/4 h-10 text-white rounded-xl font-semibold"}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default MetricValues;