import { useState, useEffect } from "react";
import axios from "./axiosInstance";

const RecycleBin = () =>
{

    const [searchDeletedNote, setSearchDeletedNote] = useState('');
    const [deletedNotes, setDeletedNotes] = useState([]);

    const filteredDeletedNotes = deletedNotes.filter((deleteNote) => deleteNote.title.toLowerCase().includes(searchDeletedNote.toLowerCase()));

    useEffect(() =>
    {
        const getDeletedNote = async () =>
        {
            const response = await axios.get('/DuyAnh/get_deleted_notes');
            setDeletedNotes(response.data.data);
        }

        getDeletedNote();
    }, [])

    const restoreNote = async (id) =>
    {
        if (window.confirm("Are you sure you want to restore this note?"))
        {
            await axios.put('/DuyAnh/restore_data/' + id);
            alert("Successfully restore!");
            window.location.reload();
        }
    }

    const permanentlyDeleteNotes = async (id) =>
    {
        if (window.confirm("Are you sure you want to delete this note permanently?"))
        {
            await axios.delete('/DuyAnh/delete_data_forever/' + id);
            alert("Successfully delete!");
            window.location.reload();
        }
    }

    return (
        <div className="home">
            <div className="Input">
                <h1>All deleted notes</h1>
                <input className="note-input" type="text" placeholder="Search a deleted note" value={ searchDeletedNote } onChange={(e) => setSearchDeletedNote(e.target.value)}></input>
            </div>
            <ul className="note-list">
                {
                    filteredDeletedNotes.map(deletedNote => 
                    (
                        <li className="note-item" key={ deletedNote.id }> 
                            <h3 className="note-title">
                                Title: { deletedNote.title }
                            </h3>
                            <h4>
                                Created on: { deletedNote.created_time }
                            </h4>
                            <p className="note-content">
                                { deletedNote.content }
                            </p>
                            <div className="delete-button">
                                <button className="res-button" onClick={() => restoreNote(deletedNote.id)}>Restore</button>
                                <button className="del-button" onClick={() => permanentlyDeleteNotes(deletedNote.id)}>Delete</button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default RecycleBin;