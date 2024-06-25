import { useEffect, useRef, useState } from "react";

export default function ImageUploader({ id , onInput }) {
    const filePickerRef = useRef();
    const [previewUrl, setPreviewUrl] = useState();
    const [file , setfile] = useState();
    const [isValid , setIsValid] = useState(false);

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    } , [file]);
    function pickedHandler(ev) {
        let pickedFile;
        let fileIsValid = isValid;
        if (ev.target.files && ev.target.files.length === 1) {
            pickedFile = ev.target.files[0];
            setfile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        onInput(id , pickedFile , fileIsValid);
    }

    function pickImageHandler() {
        filePickerRef.current.click();
    }

    return (
        <div className="flex flex-col items-center">
            <input
                id={id}
                ref={filePickerRef}
                style={{ display: 'none' }}
                type="file"
                accept=".jpg,.png,.jpeg , .webp"
                onChange={pickedHandler}
            />
            <div className="w-40 h-40 mb-4">
                {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full rounded-2xl object-cover" />
                ) : (
                    <div className="w-full h-full rounded-2xl bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-500">No image selected</p>
                    </div>
                )}
            </div>
            <button
                type="button"
                onClick={pickImageHandler}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
                PICK IMAGE
            </button>
        </div>
    );
}
