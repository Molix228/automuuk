import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ModalImage from 'react-modal-image';

const PhotoUpload = ({ selectedPhotos, onPhotoSelect, onPrevStep, onNextStep }) => {
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const onDrop = (acceptedFiles) => {
        const selectedImages = acceptedFiles.map((file) => ({ name: file.name, file }));
        setUploadedPhotos(selectedImages);
        onPhotoSelect(selectedImages);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const openModal = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onNextStep();
        }
    };

    return (
        <div onKeyDown={handleKeyDown}>
            <h2 className="text-xl md:text-2xl">Photos Uploading</h2>
            <div
                {...getRootProps()}
                className={`dropzone border-dashed border ${isDragActive ? 'border-green-500' : 'border-gray-300'} rounded-md p-4 text-center cursor-pointer`}
            >
                <input {...getInputProps()} />
                <p>{isDragActive ? 'Drop the photos here' : 'Drag and drop photos here or click to browse.'}</p>
            </div>
            {/* Отображение выбранных и загруженных фотографий */}
            {uploadedPhotos.length > 0 && (
                <div>
                    <h3>Выбранные фотографии:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {uploadedPhotos.map((photo, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(photo.file)}
                                alt={photo.name}
                                className="max-w-full h-auto rounded cursor-pointer"
                                onClick={() => openModal(photo)}
                            />
                        ))}
                    </div>
                </div>
            )}
            {selectedPhotos && selectedPhotos.length > 0 && (
                <div>
                    <h3>Загруженные фотографии:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {selectedPhotos.map((photo, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(photo.file)}
                                alt={photo.name}
                                className="max-w-full h-auto rounded cursor-pointer"
                                onClick={() => openModal(photo)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Модальное окно для увеличения изображения */}
            {selectedImage && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center">
                    <div className="max-w-md w-full bg-white rounded-lg px-4 pb-2">
                        <button className="text-3xl" onClick={closeModal}>
                            Close❌
                        </button>
                        <ModalImage
                            small={URL.createObjectURL(selectedImage.file)}
                            large={URL.createObjectURL(selectedImage.file)}
                            alt={selectedImage.name}
                        />
                    </div>
                </div>
            )}

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

export default PhotoUpload;