import React, {useState} from 'react';

const DescriptionForm = ({ onDescriptionChange, onPrevStep}) => {

    const [description, setDescription] = useState('');

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        if (value.length <= 2500) {
            setDescription(value);
            onDescriptionChange(value);
        }
    }

    return (
        <div>
            <h2>Description</h2>
            <textarea
                className={"border rounded-xl px-5 py-20 w-full text-start font-mono text-lg"}
                placeholder={"Enter description (max: 2500 symbols)"}
                value={description}
                onChange={handleDescriptionChange}
            />

            <div className={"flex flex-col md:flex-row justify-between w-full mt-10"}>
                <button onClick={onPrevStep}
                        className={"m-2 bg-blue-500 w-full md:w-1/4 h-10 text-white rounded-xl font-semibold"}>
                    Previous Step
                </button>
            </div>
        </div>
    );
};

export default DescriptionForm;
