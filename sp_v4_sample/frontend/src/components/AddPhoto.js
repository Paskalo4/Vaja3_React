import { useContext, useState } from 'react'
import { Navigate } from 'react-router';
import { UserContext } from '../userContext';

function AddPhoto(props) {
    const userContext = useContext(UserContext); 
    const[name, setName] = useState('');
    const[file, setFile] = useState('');
    const [description, setDescription] = useState('');
    const[uploaded, setUploaded] = useState(false);

    async function onSubmit(e){
        e.preventDefault();

        if(!name){
            alert("Vnesite ime!");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', file);
        formData.append('description', description);
        const res = await fetch('http://localhost:3001/photos', {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        const data = await res.json();

        setUploaded(true);
    }

    return (
        <form className="publish-form" onSubmit={onSubmit}>
            {!userContext.user ? <Navigate replace to="/login" /> : ""}
            {uploaded ? <Navigate replace to="/" /> : ""}
            <input type="text" className="form-control" name="ime" placeholder="Ime slike" value={name} onChange={(e)=>{setName(e.target.value)}}/>
            <label>Izberi sliko</label>
            <input type="file" id="file" onChange={(e)=>{setFile(e.target.files[0])}}/>
            <textarea className="form-control" name="description" placeholder="Opis slike" value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea> {/* Polje za opis */}
            <input className="btn btn-primary" type="submit" name="submit" value="Naloži" />
        </form>
    )
}

export default AddPhoto;