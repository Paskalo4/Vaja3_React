import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../userContext'; // Prepričaj se, da obstaja

function PhotoDetail() {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchPhoto = async () => {
            const res = await fetch(`http://localhost:3001/photos/${id}`);
            const data = await res.json();
            setPhoto(data);
        };

        fetchPhoto();
    }, [id]);

    useEffect(() => {
        // Pridobi komentarje za dano sliko
        const fetchComments = async () => {
            const res = await fetch(`http://localhost:3001/photos/${id}/comments`);
            const data = await res.json();
            setComments(data);
        };

        fetchComments();
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!comment) return;
        const res = await fetch(`http://localhost:3001/photos/${id}/comments`, {
            method: 'POST',
            credentials: 'include', // če uporabljate seje/cookie
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment })
        });
        if (res.ok) {
            const data = await res.json();
            // Posodobi lokalni seznam komentarjev, če endpoint vrne nov komentar
            setComments(prev => [...prev, data]);
            setComment('');
        }
    };

    if (!photo) {
        return <div>Nalaganje...</div>;
    }
    return (
        <div className="photo-detail">
            <h2>{photo.name}</h2>
            <img 
                src={"http://localhost:3001/" + photo.path} 
                alt={photo.name} 
                className="photo-detail-img"
            />
            <p>{photo.description}</p>
            <p className="text-muted">
                Avtor: {photo.postedBy?.username || "Neznan"} | Objavljeno: {photo.createdAt ? new Date(photo.createdAt).toLocaleString() : "Ni podatka"}
            </p>
    
            {/* Oddelek za komentarje */}
            <div className="comments-section">
                <h3>Komentarji</h3>
                {comments.length > 0 ? (
                    <ul>
                        {comments.map((c, index) => (
                            <li key={index}>
                                <strong>{c.commentedBy?.username || "Neznan"}:</strong> {c.text}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Ni komentarjev.</p>
                )}
                {user ? (
                    <form onSubmit={handleCommentSubmit}>
                        <textarea 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Dodaj komentar..."
                            className="comment-input"
                        />
                        <button type="submit" className="comment-button">Objavi komentar</button>
                    </form>
                ) : (
                    <p>Prijavite se, da komentirate.</p>
                )}
            </div>
        </div>
    );
}

export default PhotoDetail;