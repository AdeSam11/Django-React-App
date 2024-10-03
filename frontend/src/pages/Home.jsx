import { useState, useEffect } from "react";
import api from "../api"; // API service for making HTTP requests
import Note from "../components/Note"; // Component to display individual notes
import "../styles/Home.css"; // CSS styles specific to the Home component
import { useNavigate } from "react-router-dom"; // Import for navigation

function Home() {
    // State to hold notes, content, title, visibility, and error messages
    const [notes, setNotes] = useState([]); // Array to store notes
    const [content, setContent] = useState(""); // State for note content
    const [title, setTitle] = useState(""); // State for note title
    const [showAll, setShowAll] = useState(false); // State to determine if all notes should be shown
    const [error, setError] = useState(null); // State for error messages
    const navigate = useNavigate(); // Hook for navigation

    // Function to toggle the visibility of all notes
    const toggleShowAll = () => {
        setShowAll(!showAll); // Toggle the showAll state
    };

    // Fetch notes when the component mounts
    useEffect(() => {
        getNotes();
    }, []); // Empty dependency array means this runs once on mount

    // Function to fetch notes from the API
    const getNotes = async () => {
        try {
            const res = await api.get("/api/notes/"); // API call to get all notes
            setNotes(res.data); // Update state with fetched notes
            console.log(res.data); // Log the fetched notes for debugging
        } catch (err) {
            setError("Failed to fetch notes."); // Set error message if fetch fails
            console.error(err); // Log the error for debugging
        }
    };

    // Function to delete a note by its ID
    const deleteNote = async (id) => {
        try {
            const res = await api.delete(`/api/notes/delete/${id}/`); // API call to delete the note
            if (res.status === 204) {
                alert("Note deleted!"); // Notify user if deletion was successful
                getNotes(); // Refresh notes list
            } else {
                alert("Failed to delete note."); // Notify user if deletion failed
            }
        } catch (err) {
            console.error('Error deleting note:', err); // Log the error for debugging
            alert('Failed to delete note.'); // Notify user of failure
        }
    };

    // Function to create a new note
    const createNote = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const res = await api.post("/api/notes/", { content, title }); // API call to create a new note
            if (res.status === 201) {
                alert("Note created!"); // Notify user if creation was successful
                setTitle(""); // Reset title input
                setContent(""); // Reset content input
                getNotes(); // Refresh notes list
            } else {
                alert("Failed to create note."); // Notify user if creation failed
            }
        } catch (err) {
            console.error('Error creating note:', err); // Log the error for debugging
            alert('Failed to create note.'); // Notify user of failure
        }
    };

    // Function to handle user logout
    const handleLogout = () => {
        // Clear any authentication tokens or user data
        localStorage.removeItem("authToken"); // Example for token removal
        navigate("/login"); // Redirect to the login page
    };

    return (
        <div>
            <h2>Notes App</h2> {/* Main heading for the app */}
            {error && <p className="error">{error}</p>} {/* Display error message if exists */}
            {notes.length === 0 ? (
                <p>Your notes will appear here.</p> // Message when there are no notes
            ) : (
                <>
                    {notes.slice(0, showAll ? notes.length : 2).map((note) => (
                        <Note note={note} onDelete={deleteNote} key={note.id} /> // Render each note
                    ))}
                    {notes.length > 2 && (
                        <button className="see-button" onClick={toggleShowAll}>
                            {showAll ? 'See Less' : 'See All Notes'}
                        </button>
                    )}
                </>
            )}
            <h2>Create a Note</h2> {/* Heading for the note creation form */}
            <form onSubmit={createNote}> {/* Form for creating a new note */}
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)} // Update title state on input change
                    value={title} // Controlled input
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content} // Controlled textarea
                    onChange={(e) => setContent(e.target.value)} // Update content state on input change
                ></textarea>
                <br />
                <input type="submit" value="Submit" /> {/* Submit button for the form */}
            </form>
            <div className="button-container">
                <button className="logout-button" onClick={handleLogout}> {/* Logout button */}
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Home; // Export the Home component for use in other parts of the application