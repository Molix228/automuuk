import React, { useState } from 'react';
const BrandSelection = ({ onSelectBrandAndModel, onNextStep }) => {
    const brandsAndModels = {
        'Audi': ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'S4', 'S5', 'S6', 'S7', 'S8', 'RS-3', 'RS-4', 'RS-5', 'RS-6', 'RS-7', 'Q2', 'Q3', 'Q4', 'Q5', 'Q7', 'Q8', 'e-tron', 'TT', 'R8'],
        'Baic': ['Model1', 'Model2', 'Model3', 'Model4', 'Model5', 'EU5', 'EX5', 'BJ80', 'BJ40', 'BJ20'],
        'Baojun': ['ModelX', 'ModelY', 'ModelZ', 'ModelW', '510', '530', '360', 'RS-3', 'RS-5'],
        'BMW': ['X1', 'X3', 'X5', 'X7', '1-Series', '114', '116', '118', '120', '123', '125', '128', '130', '135', '1-Series M Coupe', '3-Series', '315', '316', '318', '320', '323', '325', '330', '335', '340', '5-Series', '518', '520', '523', '524', '525', '528', '530', '533', '535', '540', '545', '550', '7-Series', '725', '728', '730', '732', '733', '735', '740', '745', '750', '760', 'i3', 'i8', 'Z4', 'X2', 'X4', 'X6', 'M2', 'M3', 'M4', 'M5', 'M8'],
        'Buick': ['Enclave', 'Encore', 'Envision', 'Regal', 'GL8', 'Verano', 'Lacrosse', 'Excelle', 'Cascada', 'Enspire'],
        'BYD': ['Song', 'Tang', 'Yuan', 'Han', 'e2', 'e3', 'e5', 'e6', 'S7', 'Qin', 'Tang DM', 'Song Pro'],
        'Cadillac': ['CT4', 'CT5', 'XT4', 'XT5', 'Escalade', 'CT6', 'ATS', 'XTS', 'SRX', 'ELR'],
        'Changan': ['CS35', 'CS55', 'CS75', 'CS95', 'UNI-T', 'Raeton', 'Eado', 'Alsvin', 'Oushang', 'Benben'],
        'Chery': ['Tiggo 2', 'Tiggo 3', 'Tiggo 4', 'Tiggo 5', 'Arrizo 6', 'QQ', 'Fulwin', 'E3', 'E5', 'Tiggo 7'],
        'Chevrolet': ['Cruze', 'Malibu', 'Equinox', 'Traverse', 'Camaro', 'Tahoe', 'Suburban', 'Silverado', 'Spark', 'Sonic', 'Impala', 'Blazer'],
        'Citroen': ['C3', 'C4', 'C5', 'Berlingo', 'Cactus', 'Spacetourer', 'C1', 'C2', 'C4 Cactus', 'C-Elysee'],
        'Dacia': ['Sandero', 'Duster', 'Logan', 'Lodgy', 'Dokker', 'Duster Oroch'],
        'Daihatsu': ['Move', 'Mira', 'Terios', 'Tanto', 'Boon', 'Copen', 'Altis', 'Esse', 'Hijet'],
        'Dodge': ['Challenger', 'Charger', 'Durango', 'Journey', 'Viper', 'Grand Caravan', 'Caliber', 'Avenger', 'Nitro'],
        'Dongfeng': ['S30', 'S50', 'AX7', 'Joyear', 'T5', 'T9', 'Junfeng', 'A60', 'A9', 'AX3'],
        'Fiat': ['500', 'Panda', 'Tipo', '500X', 'Ducato', '500L', '124 Spider', 'Qubo', 'Fullback', 'Argo'],
        'Ford': ['Focus', 'Fusion', 'Escape', 'Explorer', 'Mustang', 'F-150', 'Ranger', 'Edge', 'EcoSport', 'Expedition'],
        'GMC': ['Sierra', 'Yukon', 'Terrain', 'Acadia', 'Canyon', 'Envoy', 'Savana', 'Jimmy', 'Typhoon'],
        'Geely': ['Emgrand 7', 'Boyue', 'X7', 'Coolray', 'Jiaji', 'Borui', 'Vision', 'Binrui', 'Xingyue', 'Atlas Pro'],
        'Haval': ['H2', 'H6', 'H9', 'F7', 'F9', 'Jolion', 'Big Dog', 'M6', 'H4', 'H1'],
        'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'Fit', 'Odyssey', 'HR-V', 'Ridgeline', 'Insight', 'Clarity'],
        'Hyundai': ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Kona', 'Palisade', 'Venue', 'Nexo', 'Ioniq', 'Azera'],
        'Isuzu': ['D-Max', 'MU-X', 'F-Series', 'Trooper', 'Ascender', 'Axiom', 'VehiCROSS', 'i-Series', 'Bighorn'],
        'JAC': ['S2', 'S3', 'S5', 'iEV7S', 'iEVA50', 'iEV6E', 'iEV8', 'iEV7L', 'iEV6S', 'iEV7', 'J4', 'J5', 'J6', 'J7'],
        'Jeep': ['Cherokee', 'Grand Cherokee', 'Wrangler', 'Renegade', 'Compass', 'Gladiator', 'Commander', 'Patriot', 'Liberty', 'Wagoneer'],
        'Kia': ['Forte', 'Optima', 'Sportage', 'Sorento', 'Telluride', 'Stinger', 'Rio', 'Soul', 'Niro', 'Cadenza'],
        'Land Rover': ['Range Rover', 'Discovery', 'Defender', 'Velar', 'Evoque', 'Sport', 'Freelander', 'Discovery Sport', 'Range Rover Sport'],
        'Lada': ['Granta', 'Vesta', 'XRAY', 'Niva', 'Priora', 'Kalina', '4x4', 'Largus', 'Urban', 'Vesta Cross'],
        'Lexus': ['RX', 'NX', 'ES', 'GX', 'GS', 'LX', 'IS', 'LS', 'RC', 'LC', 'UX'],
        'Maruti': ['Swift', 'Baleno', 'Dzire', 'Wagon R', 'Vitara Brezza', 'Ertiga', 'S-Presso', 'Celerio', 'Alto', 'Ignis'],
        'Mazda': ['Mazda3', 'Mazda6', 'CX-5', 'MX-5', 'CX-9', 'MX-30', 'CX-3', 'CX-30', 'RX-8', 'BT-50'],
        'Mercedes': ['A-Class', 'C-Class', 'E-Class', 'GLE', 'S-Class', 'GLC', 'G-Class', 'CLA', 'CLS', 'GLA'],
        'Mitsubishi': ['Outlander', 'Pajero', 'Eclipse Cross', 'L200', 'ASX', 'Mirage', 'Montero', 'Raider', '3000GT', 'Endeavor'],
        'Mini': ['Cooper', 'Countryman', 'Clubman', 'Convertible', 'Paceman', 'Hardtop', 'Roadster', 'Coupe', 'John Cooper Works', 'Electric'],
        'Nissan': ['Altima', 'Rogue', 'Pathfinder', 'Titan', 'Armada', 'Kicks', '370Z', 'Maxima', 'Murano', 'Leaf'],
        'Opel': ['Astra', 'Insignia', 'Corsa', 'Grandland X', 'Mokka', 'Zafira', 'Karl', 'Crossland X', 'Ampera'],
        'Peugeot': ['208', '308', '2008', '3008', '5008', 'Traveller', 'Partner', 'Rifter', 'Expert', 'Boxer'],
        'Ram': ['1500', '2500', '3500', 'Rebel', 'Power Wagon', 'ProMaster', 'ProMaster City'],
        'Renault': ['Clio', 'Megane', 'Kadjar', 'Captur', 'Duster', 'Zoe', 'Twingo', 'Koleos', 'Fluence', 'Talisman'],
        'Roewe': ['RX3', 'Marvel X', 'eRX5', 'i5', 'ei5', 'eRX8', 'RX5 Plus', 'MARVEL-R', 'MARVEL-R2', 'iMAX8'],
        'Saipa': ['Tiba', 'Pride', 'Quick', 'L300', 'Saina', 'X100', 'Dolphin', 'Platis', 'Tigra', 'Star'],
        'Seat': ['Ibiza', 'Leon', 'Ateca', 'Tarraco', 'Arona', 'Mii', 'Alhambra', 'Toledo', 'Exeo', 'Cupra'],
        'Skoda': ['Octavia', 'Superb', 'Kodiaq', 'Karoq', 'Scala', 'Rapid', 'Fabia', 'Enyaq iV', 'Citigo'],
        'Suzuki': ['Swift', 'Vitara', 'Jimny', 'S-Cross', 'Ignis', 'Baleno', 'Ciaz', 'XL7', 'Alto', 'Ertiga'],
        'Subaru': ['Impreza', 'Outback', 'Forester', 'Crosstrek', 'Ascent', 'Legacy', 'WRX', 'BRZ', 'XV', 'Baja'],
        'Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Land Cruiser', 'Prius', 'Tacoma', 'Tundra', 'Sienna', '86'],
        'Trumpchi': ['GS4', 'GS5', 'GA6', 'GS8', 'GM8', 'GS3', 'GS7', 'GS2', 'ENOVATE ME7', 'AION S'],
        'Volkswagen': ['Golf', 'Passat', 'Tiguan', 'Atlas', 'Arteon', 'ID.4', 'Touareg', 'Jetta', 'Polo', 'Golf GTI'],
        'Volvo': ['XC60', 'XC90', 'S90', 'S60', 'V60', 'XC40', 'V90', 'V40', 'C40 Recharge', 'S60 Polestar'],
        'Wuling': ['Hong Guang', 'Rong Guang', 'Mini EV', 'Cortez', 'Almaz', 'Confero', 'Formo', 'Sunshine', 'Journey', 'Future'],
    };



    const brands = Object.keys(brandsAndModels);

    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);

    const handleBrandChange = (brand) => {
        setSelectedBrand(brand);
        setSelectedModel(null); // Сброс
    };

    const handleModelChange = (model) => {
        setSelectedModel(model);
        onSelectBrandAndModel(selectedBrand, model);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onNextStep();
        }
    };

    return (
        <div className={`${selectedBrand ? 'translate-y-[-10px] transition-all duration-500 ease-in-out' : ''}`} onKeyDown={handleKeyDown}>
            <label className="block text-xl md:text-3xl text-neutral-700 mb-4 font-bold">Select Brand:</label>
            <select
                className="border rounded-xl px-15 py-4 w-full text-center font-bold text-lg"
                value={selectedBrand || ""}
                onChange={(e) => handleBrandChange(e.target.value)}
            >
                <option value="">------</option>
                {brands.map((brand) => (
                    <option key={brand} value={brand}>
                        {brand}
                    </option>
                ))}
            </select>

            {selectedBrand && (
                <div className={`mt-4 ${selectedModel ? 'opacity-100 transition-all duration-500 ease-in-out' : ''}`}>
                    <label className="block text-xl md:text-3xl text-neutral-700 mb-4 font-bold">Select Model:</label>
                    <select
                        className="border rounded-xl px-15 py-4 w-full text-center font-bold text-lg"
                        value={selectedModel || ""}
                        onChange={(e) => handleModelChange(e.target.value)}
                    >
                        <option value="">------</option>
                        {brandsAndModels[selectedBrand].map((model) => (
                            <option key={model} value={model}>
                                {model}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {selectedBrand && selectedModel && (
                <div className={"flex justify-end mt-5"}>
                    <button onClick={onNextStep} className={"bg-blue-500 w-full md:w-1/4 h-10 text-white rounded-xl font-semibold"}>Next</button>
                </div>

            )}
        </div>
    );
};

export default BrandSelection;