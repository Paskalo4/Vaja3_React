import { useState, useEffect } from 'react';
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

    return(
        <div>
            <h3>Photos:</h3>
            <ul>
                {photos.map(photo=>(<Photo photo={photo} key={photo._id}></Photo>))}
            </ul>
        </div>
    );
}

export default Photos;