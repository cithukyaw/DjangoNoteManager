import {useEffect, useState} from "react";
import api from "../api";
import "../styles/Home.css"
import Note from "../components/Note.jsx";
import {LoadingIndicator} from "../components/LoadingIndicator.jsx";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api.get('/api/notes/')
            .then(res => res.data)
            .then(data => {
                setNotes(data);
                console.log(data);
            })
            .catch(err => alert(err));
    }

    const createNote = (e) => {
        e.preventDefault();
        setLoading(true);

        api.post('/api/notes/', { content, title })
            .then(res => {
                if (res.status === 201) alert('Note created!');
                else alert('Failed to create note.')

                setLoading(false);
                setTitle('');
                setContent('');

                getNotes();
            })
            .catch(err => {
                setLoading(false);
                alert(err);
            });
    };

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}`)
            .then(res => {
                if (res.status === 204) alert('Note deleted!');
                else alert('Failed to delete note.')
                getNotes();
            })
            .catch(err => alert(err));
    };

    return (
        <div>
            <div>
                <h2>Notes</h2>
                {notes.length ?
                    notes.map((note) => <Note note={note} onDelete={deleteNote} key={note.id} />)
                    :
                    <p>There is no notes yet. Create a new note below.</p>
                }
            </div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        required
                        value={content}
                        rows={5}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                {loading && <LoadingIndicator />}
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;
