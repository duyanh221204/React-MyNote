import React, { useState, useEffect } from "react";
import axios from "./axiosInstance";
import Note from "./Note";

const Home = () =>
{
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState('');
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() =>
    {
        const getData = async () =>
        {
            const response = await axios.get("https://demo_project-1-d5070894.deta.app/DuyAnh");
            setNotes(response.data.data);
        };
        getData();
    }, []);

    return (
        <div className="home">
            <div className="Input">
                <h1>All notes</h1>
                <input className="note-input" type="text" placeholder="Search a note" value={ search } onChange={ (e) => setSearch(e.target.value) }></input>
            </div>
            <ul className="note-list">
                {
                    filteredNotes.map(note =>
                    (
                        <li className="note-item" key={ note.id }>
                            <Note note={note}/>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Home;
