import Avatar from "./Avatar";
import {Link} from 'react-router-dom';

export default function UserItems({ id , image , name , place}) {

    return (
        <div className="w-full p-2">
        <Link to={`/${id}/places`} className="flex items-center bg-white rounded-lg shadow-md p-4 hover:bg-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105">
            <div className="mr-4">
                <Avatar image={`http://localhost:4000/${image}`} alt={name} className="w-16 h-16 rounded-full object-cover" />
            </div>
            <div>
                <h2 className="text-xl font-semibold">{name}</h2>
                <h3 className="text-gray-500">
                    {place} {place === 1 ? "place" : "places"}
                </h3>
            </div>
        </Link>
    </div>
    );
  }