import React, { useState } from 'react';

const ImageUpload = ({ onImageChange }) => {
    const [image, setImage] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = handleImageLoad;
            reader.readAsDataURL(file);
        }
    };

    // it makes the img base64 be lighter 👍
    // also it sets the height 
    const handleImageLoad = (event) => {
        const imageObj = new Image();
        imageObj.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            let width = 200;
            let height = (imageObj.height * width) / imageObj.width;
            if (height > 200) {
                height = 200;
                width = (imageObj.width * height) / imageObj.height;
            }

            canvas.width = width;
            canvas.height = height;

            context.drawImage(imageObj, 0, 0, width, height);

            const dataURL = canvas.toDataURL('image/png');
            setImage(dataURL);

            onImageChange(dataURL);
        };
        imageObj.src = event.target.result;
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {image && <img src={image} alt="Thumbnail" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
        </div>
    );
};

export default ImageUpload;
