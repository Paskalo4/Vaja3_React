import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';

function Profile(){
    const userContext = useContext(UserContext); 
    const [profile, setProfile] = useState({});

    useEffect(function(){
        const getProfile = async function(){
            const res = await fetch("http://localhost:3001/users/profile", {credentials: "include"});
            const data = await res.json();
            setProfile(data);
        }
        getProfile();
    }, []);

    return (
        <>
            {!userContext.user ? <Navigate replace to="/login" /> : ""}
            <div className="profile-container">
                <h2>Profil</h2>
                <p>Uporabniško ime: <strong>paskalo4</strong></p>
                <p>Email: <strong>paskalo4@example.com</strong></p>
                <button>Odjava</button>
            </div>
        </>
    );
}

export default Profile;