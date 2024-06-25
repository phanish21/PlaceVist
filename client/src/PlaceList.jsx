import PlaceItem from "./PlaceItem";
import {Link} from 'react-router-dom';

export default function PlaceList({items , onDeletePlace }) {
    return(
        <div className="flex flex-col items-center justify-center h-full">
            {items?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                    {items.map((place) => (
                        <PlaceItem
                            key={place.id}
                            id={place.id}
                            image={place.image}
                            title={place.title}
                            description={place.description}
                            address={place.address}
                            creatorId={place.creator}
                            onDelete={onDeletePlace}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-gray-600 flex flex-col items-center justify-center">
                    <p className="font-bold text-2xl mb-4">No places found</p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-xl">
                        <Link to={'/places/new'}>Share Places</Link>
                    </button>
                </div>
            )}
        </div>
    );
}