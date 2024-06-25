import React from 'react';
import { useContext } from 'react';
import {Link} from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { useHttpClient } from './HttpHook';
import ErrorModal from './ErrorModel';

export default function PlaceItem({id,image,title ,description,creatorId,address , onDelete}) {

    const auth = useContext(AuthContext);
    const {isLoading , error , sendRequest , clearError} = useHttpClient();
    function generateMapLink(address) {
        const addressEncoded = encodeURIComponent(address);
        return `https://www.google.com/maps?q=${addressEncoded}`;
    }
    async function deletionHandler(){
        try {
            await sendRequest(
                `http://localhost:4000/api/places/${id}` ,
                'DELETE' ,
                null,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            )
            onDelete(id);
        } catch (err) {}
    }
    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <div className="flex justify-center items-center py-8 px-4">
                <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col max-w-md mx-auto mb-6 transform transition-transform duration-300 hover:scale-105">
                    <div className="relative mb-4">
                        <img
                            src={`http://localhost:4000/${image}`}
                            alt={title}
                            className="rounded-t-lg w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md shadow">
                            {creatorId === auth.userId ? "Your Place" : "Explore"}
                        </div>
                    </div>
                    <div className="flex-grow p-4">
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
                        <h3 className="text-gray-500 mb-4">{address}</h3>
                        <p className="text-gray-700 mb-6">{description}</p>
                        <div className="flex flex-col items-center">
                            <a
                                className="flex items-center justify-center gap-2 bg-blue-500 text-white rounded-full px-4 py-2 mb-4 hover:bg-blue-600 transition duration-300 shadow-md"
                                href={generateMapLink(address)}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                    />
                                </svg>
                                View on map
                            </a>
                            {auth.userId === creatorId && (
                                <div className="flex gap-4">
                                    <Link
                                        to={`/places/${id}`}
                                        className="flex items-center justify-center gap-2 bg-green-500 text-white rounded-full px-4 py-2 hover:bg-green-600 transition duration-300 shadow-md"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                            />
                                        </svg>
                                        Edit
                                    </Link>
                                    <button
                                        onClick={deletionHandler}
                                        className="flex items-center justify-center gap-2 bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-600 transition duration-300 shadow-md"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                            />
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}