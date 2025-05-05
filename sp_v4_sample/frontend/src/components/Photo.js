import { Link } from 'react-router-dom';
import React from 'react';

function Photo(props) {
    return (
        <div className="card bg-dark text-dark mb-2" style={{ width: "300px" }}>
            <div className="card-body">
                <h5 className="card-title">{props.photo.name}</h5> {/* Naslov slike */}
                <p className="card-text">{props.photo.description}</p> {/* Opis slike */}
                <p className="card-text text-muted">Avtor: {props.photo.postedBy?.username || "Neznan"}</p> {/* Avtor */}
                <p className="card-text text-muted">Objavljeno: {props.photo.createdAt ? new Date(props.photo.createdAt).toLocaleString() : "Ni podatka"}</p> {/* Datum objave */}
            </div>
            <Link to={`/photo/${props.photo._id}`}>
            <img 
                className="card-img-bottom" 
                src={"http://localhost:3001/" + props.photo.path} 
                alt={props.photo.name} 
                style={{ width: "300px", height: "300px", objectFit: "cover" }} // Nastavljena velikost slike
            />
            </Link>
        </div>
    );
}

export default Photo;