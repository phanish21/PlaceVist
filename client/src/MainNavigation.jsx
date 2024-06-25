import React, { useEffect, useRef, useState } from "react";
import MainHeader from "./MainHeader";
import {Link} from 'react-router-dom';
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";

export default function MainNavigation() {
    const [showDrawer, setShowDrawer] = useState(false);
    const toggleBoxRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(ev) {
            if (toggleBoxRef.current && !toggleBoxRef.current.contains(ev.target)) {
                setShowDrawer(false);
            }
        }
        document.addEventListener('mousedown' , handleClickOutside);
        return () => {
            document.removeEventListener('mousedown' , handleClickOutside);
        };
    } , []);

    function showDraweronclick(action = null) {
        if (action === 'toggle') {
            setShowDrawer((prevShowDrawer) => !prevShowDrawer);
        } else if (action === 'close') {
            setShowDrawer(false);
        }
    }    
    
    return(
        <React.Fragment>
        <MainHeader>
            <div ref={toggleBoxRef} className="relative" >
            <button onClick={() => showDraweronclick('toggle')} className="text-white focus:outline-none lg:hidden absolute -top-1 left-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
            {showDrawer && (
                <SideDrawer>
                    <nav>
                        <NavLinks />
                    </nav>
                    <button onClick={() => showDraweronclick('close')} className="text-white focus:outline-none">Close</button>
                </SideDrawer>
            )}
            </div>
            <div className="text-white absolute top-7 left-20">
                <h1 className="text-xl">
                    <Link to={'/'} className="text-white">Your Place</Link>
                </h1>
            </div>
            <nav className="lg:block hidden">
                <NavLinks showDraweronclick={showDraweronclick} />
            </nav>
        </MainHeader>
    </React.Fragment>
    );
}