import { useContext } from 'react';
import {NavLink} from 'react-router-dom';
import { AuthContext } from './AuthContext';
export default function NavLinks({showDraweronclick}) {

  const auth  = useContext(AuthContext);
    return(
      <ul className="lg:flex lg:flex-row lg:space-x-4 lg:items-center lg:justify-end flex flex-col items-center justify-center py-3 gap-2">
        <li>
          <NavLink to='/' exact="true" className="text-white  hover:text-gray-300" onClick={() => showDraweronclick('close')} >
            ALL USERS
          </NavLink>
        </li>
        {auth.isLoggedIn &&
        <li>
          <NavLink to={`/${auth.userId}/places` } className="text-white hover:text-gray-300"onClick={() => showDraweronclick('close')} >
            MY PLACES
          </NavLink>
        </li>
        }
        {auth.isLoggedIn && 
        <li>
          <NavLink to='/places/new' className="text-white hover:text-gray-300" onClick={() => showDraweronclick('close')}>
            ADD PLACE
          </NavLink>
        </li>
        }
        {!auth.isLoggedIn &&
        <li>
          <NavLink to='/auth' className="text-white hover:text-gray-300" onClick={() => showDraweronclick('close')}>
            AUTH
          </NavLink>
        </li>
        }
        {auth.isLoggedIn && 
        <li>
          <button className="text-white hover:text-gray-300" onClick={auth.logout} >
            Logout
          </button>
        </li>
        }
      </ul>
    );
}