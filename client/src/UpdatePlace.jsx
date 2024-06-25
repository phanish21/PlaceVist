import React, { useContext } from 'react';
import {useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "./Validate";
import { useForm } from './FormHook';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHttpClient } from './HttpHook';
import ErrorModal from './ErrorModel';
import { AuthContext } from './AuthContext';

export default function UpdatePlace() {
    const {id} = useParams();
    const [loadedPlace , setLoadedPlace] = useState();
    const {isLoading , error , sendRequest , clearError }= useHttpClient();
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [formState , inputHandler , setFormData] = useForm({
        title:{
            value : '',
            isValid : false
        },
        description:{
            value : '',
            isValid : false
        }
    } , false );

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:4000/api/places/${id}`);
                setLoadedPlace(responseData.place);
                setFormData({
                    title:{
                        value : responseData.place().title,
                        isValid : true
                    },
                    description:{
                        value : responseData.place().description,
                        isValid : true
                    }
                } , true);
            } catch (err) {}
        }
        fetchPlaces();
    } , [sendRequest , id , setFormData]);

    async function placeUpdateSubmitHandler(ev) {
        ev.preventDefault();
        try {
            await sendRequest(
                `http://localhost:4000/api/places/${id}` , 
                'PATCH',
                JSON.stringify(
                   { title : formState.inputs.title.value,
                    description : formState.inputs.description.value}
                ),
                {
                    'Content-Type' : 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            navigate('/' + auth.userId+'/places');
        } catch (err) {
            
        }
    }

    if (isLoading) {
        return (
            <div className="text-blue-500 font-bold text-center mt-8">
                loading...
            </div>
        );
    }
    
    if (!loadedPlace && !error) {
        return(
            <div className="text-red-500 font-bold text-center mt-8">
                COULD NOT FIND PLACE
            </div>
        );
    }
     
    return(
        <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        { !isLoading && loadedPlace && (
        <form className="max-w-md mx-auto mt-8"
         onSubmit={placeUpdateSubmitHandler}>
            <Input
                type="text"
                element="input"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                id="title"
                placeholder="Enter title"
                onInput={inputHandler}
                intialValue= {loadedPlace.title}
                intialValid={true}
                className="mb-6"
            />
            <Input
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                id="description"
                onInput={inputHandler}
                intialValue= {loadedPlace.description}
                intialValid={true}
                className="mb-6"
            />
            <button
            type="submit"
            disabled={!formState.isValid}
            className={`bg-blue-500 text-white py-2 px-4 rounded-md mt-4 block mx-auto hover:bg-blue-600 ${
                !formState.isValid && 'cursor-not-allowed opacity-50'
            }`} >
            UPDATE PLACE
        </button>
        </form>)}
        </React.Fragment>
    )
}