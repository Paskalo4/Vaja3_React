import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PhotoDetail() {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        const fetchPhoto = async () => {
            const res = await fetch(`http://localhost:3001/photos/${id}`);
            const data = await res.json();
            setPhoto(data);
        };

        fetchPhoto();
    }, [id]);

    if (!photo) {
        return <div>Nalaganje...</div>;
    }

    return (
        <div>
            <h2>{photo.name}</h2>
            <img 
                src={"http://localhost:3001/" + photo.path} 
                alt={photo.name} 
                style={{ width: '300px', height: '300px', objectFit: 'cover' }} 
            />
            <p>{photo.description}</p>
            <p className="text-muted">
                Avtor: {photo.postedBy?.username || "Neznan"} | Objavljeno: {photo.createdAt ? new Date(photo.createdAt).toLocaleString() : "Ni podatka"}
            </p>
            {/* Komentarji bodo dodani tukaj */}
        </div>
    );
}

export default PhotoDetail;