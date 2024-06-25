import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Input from "./Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "./Validate";
import { useForm } from './FormHook';
import { useHttpClient } from "./HttpHook";
import { AuthContext } from "./AuthContext";
import ErrorModal from "./ErrorModel";
import ImageUploader from "./ImageUploader";

export default function NewPlace() {
    const auth = useContext(AuthContext);
    const { isLoading , error , sendRequest , clearError} = useHttpClient();
    const [formState , inputHandler] = useForm({
        title :{
            value :'',
            isValid: false
        },
        description :{
            value :'',
            isValid: false
        },
        address :{
            value :'',
            isValid: false
        },
        image : {
            value : null,
            isValid : false
        }
    } , false );
    
    const navigate = useNavigate();

    async function placeSubmitHandler(ev) {
        ev.preventDefault();
        try {
            const formData = new FormData()
            formData.append('title' , formState.inputs.title.value );
            formData.append('description' , formState.inputs.description.value );
            formData.append('address' , formState.inputs.address.value );
            formData.append('image' , formState.inputs.image.value );
            await sendRequest('http://localhost:4000/api/places' ,
            'POST'  ,
            formData,
            {
                Authorization: 'Bearer '+ auth.token
            }
        );
        navigate('/');
        } catch (err) {
            
        }
    }
    return(
        <React.Fragment>
            {error && <ErrorModal error={error} onClear={clearError} />}
            <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8 px-4">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add a New Place</h2>
                    <form className="space-y-4" onSubmit={placeSubmitHandler}>
                        <Input
                            type="text"
                            element="input"
                            label="Title"
                            validators={[VALIDATOR_REQUIRE()]}
                            id="title"
                            placeholder="Enter title"
                            onInput={inputHandler}
                            className="w-full"
                        />
                        <Input
                            element="textarea"
                            label="Description"
                            validators={[VALIDATOR_MINLENGTH(5)]}
                            id="description"
                            placeholder="Write your description"
                            onInput={inputHandler}
                            className="w-full"
                        />
                        <Input
                            element="input"
                            label="Address"
                            validators={[VALIDATOR_REQUIRE()]}
                            id="address"
                            placeholder="Enter address"
                            onInput={inputHandler}
                            className="w-full"
                        />
                        <ImageUploader id='image' onInput={inputHandler} />
                        <button
                            type="submit"
                            disabled={!formState.isValid}
                            className={`bg-blue-500 text-white py-2 px-4 rounded-md mt-4 block w-full hover:bg-blue-600 transition duration-300 ${
                                !formState.isValid && 'cursor-not-allowed opacity-50'
                            }`}
                        >
                            ADD PLACE
                        </button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
}