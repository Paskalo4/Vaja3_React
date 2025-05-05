import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Dodaj uvoz za Link
import Photo from './Photo';

function Photos(){
    const [photos, setPhotos] = useState([]);
    useEffect(function(){
        const getPhotos = async function(){
            const res = await fetch("http://localhost:3001/photos");
            const data = await res.json();
            // Razvrsti slike po datumu objave (najnovejše najprej)
            const sortedPhotos = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setPhotos(data);
        }
        getPhotos();
    }, []);

    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>Photos:</h3>
            <div className="photos-container">
                {photos.map(photo => (
                    <div className="photo-card" key={photo._id}>
                        <Link to={`/photo/${photo._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h5>{photo.name}</h5>
                            <img src={"http://localhost:3001/" + photo.path} alt={photo.name} />
                            <p>{photo.description}</p>
                            <p className="text-muted">Avtor: {photo.postedBy?.username || "Neznan"}</p>
                            <p className="text-muted">Objavljeno: {new Date(photo.createdAt).toLocaleString()}</p>
                            <p>👍 {photo.likes ? photo.likes.length : 0} | 👎 {photo.dislikes ? photo.dislikes.length : 0}</p>                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Photos;