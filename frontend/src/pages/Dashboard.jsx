import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { ThemeToggler } from "../components/ui/ThemeToggler";
import { PulsatingButton } from "../components/ui/PulsatingButton";

function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");

  // Fetch notes and protect route
  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchNotes = async () => {
      try {
        const { data } = await API.get("/notes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(data);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchNotes();
  }, [navigate, token]);

  // Add new note
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Enter title and content");

    try {
      const { data } = await API.post(
        "/notes",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes([data, ...notes]);
      setTitle("");
      setContent("");
    } catch (error) {
      alert("Error adding note");
    }
  };

  // Delete note
  const handleDelete = async (id) => {
    try {
      await API.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      alert("Error deleting note");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
     <div className="dashboard-page"> 
    <div className="dashboard-container">
      <h1 className='dashboard-title'>Dashboard 🚀</h1>
      <ThemeToggler />
      <PulsatingButton className="logout-button" onClick={handleLogout}>Logout</PulsatingButton>

      <h2>Add Note</h2>
      <form className="add-note-form" onSubmit={handleAddNote}>
        <input className="title-btn"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea-field"
        />
        <br />
        <button type="submit" className="submit-btn">Add Note</button>
      </form>

      <h2>Your Notes</h2>
      {notes.length === 0 && <p>No notes yet!</p>}
      {notes.map((note) => (
        <div key={note._id}
          className="note-card" >
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button className="delete-btn" onClick={() => handleDelete(note._id)}>Delete</button>
        </div>
      ))}
    </div>
    </div>
     
    
  );
}

export default Dashboard;