import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./axiosInstance";
import { useParams } from "react-router-dom";

const CreateNote = () =>
{
    const [note, setNote] = useState({});
    const Navigate = useNavigate();
    const { id } = useParams();

    useEffect(() =>
    {
        const getData = async () =>
        {
            const response = await axios.get('/DuyAnh/get_note/' + id);
            setNote(response.data.data);
        }

        if (id !== '-1') getData();
    }, [])

    const handleCreateNote = async () =>
    {
        if (window.confirm("Are you sure you want to save this note?"))
        {
            if (id === '-1')
            {
                await axios.post('/DuyAnh/add_data', 
                {
                    "title": note.title,
                    "content": note.content
                });
                alert("Successfully add!");
                Navigate("/");
            }
            else
            {
                await axios.put('/DuyAnh/update_data/' + id, 
                {
                    "title": note.title,
                    "content": note.content
                });
                alert("Successfully save!");
                Navigate("/");
            }
        }
    };

    return (
        <div className="create-note">
            <div className="Input">
                <h1>{id === '-1' ? 'Create' : 'Edit'} a note here!</h1>
                <input className="create-input" type="text" placeholder="Title" value={note.title} onChange={(e) => setNote(prevNote => ({ ...prevNote, title: e.target.value }))}></input>
            </div>

            <div className="Input">
                <textarea className="create-content" placeholder="Content" value={note.content} onChange={(e) => setNote(prevNote => ({ ...prevNote, content: e.target.value }))}></textarea>
            </div>

            <div className="create-button">
                <button onClick={ handleCreateNote }>{id === '-1' ? 'Create' : 'Save'}</button>
            </div>
        </div>
    );
};

export default CreateNote;