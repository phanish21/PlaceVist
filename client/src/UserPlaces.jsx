import React from "react";
import PlaceList from "./PlaceList";
import {useParams} from  "react-router-dom"
import { useHttpClient } from "./HttpHook";
import { useEffect, useState } from "react";
import ErrorModal from "./ErrorModel";

export default function UserPlaces() {
    const [loadedPlaces , setLoadedPlaces] = useState();
    const {isLoading , error  , sendRequest , clearError } = useHttpClient();

    const {id} = useParams();

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:4000/api/places/user/${id}`);
                setLoadedPlaces(responseData.places);
            } catch (err) {}
        };
        fetchPlaces();
    } , [sendRequest , id]);

    function placeDeleteHandler(deletePlaceId) {
        setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletePlaceId))
    }

    return (
        <React.Fragment>
        {error && <ErrorModal error={error} onClear={clearError} />}
        { !isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace = {placeDeleteHandler} />}
        </React.Fragment>
    );
}