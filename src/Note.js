import React from "react";
import axios from "./axiosInstance";
import { useNavigate } from "react-router";

const Note = (props) =>
{
    const { id, title, created_time, last_updated_time, content } = props.note;
    const navigate = useNavigate();

    const handleDeleteNote = async () =>
    {
        if (window.confirm("Are you sure you want to move this note to Recycle Bin?"))
        {
            await axios.delete('/DuyAnh/delete_data/' + id);
            alert("Successfully deleted!");
            window.location.reload();
        }
    }

    const handleEditNote = () =>
    {
        navigate("/Note/" + id);
    }

    return (
        <div>
            <h3 className="note-title">
                Title: { title }
            </h3>
            <h4 className="note-time">
                Last updated on: { last_updated_time }
            </h4>
            <h4 className="note-time">
                Created on: { created_time }
            </h4>
            <p className="note-content">
                { content }
            </p>
            <div className="delete-button">
                <button className="res-button" onClick={ handleEditNote }>Edit</button>
                <button className="del-button" onClick={ handleDeleteNote }>Delete</button>
            </div>
        </div>
    );
}

export default Note;
