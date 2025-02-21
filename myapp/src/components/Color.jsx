import { useContext } from "react";
import PropTypes from "prop-types"; // ✅ Import PropTypes
import { NotesContext } from "../context/NotesContext";
import { db } from "../appwrite/database";

const Color = ({ color }) => {
    const { selectedNote, notes, setNotes } = useContext(NotesContext);

    const changeColor = async () => {
        if (!selectedNote) {
            alert("You must select a note before changing colors");
            return;
        }

        console.log("Selected color:", color);

        const currentNoteIndex = notes.findIndex((note) => note.$id === selectedNote.$id);

        if (currentNoteIndex === -1) return;

        const updatedNote = {
            ...notes[currentNoteIndex],
            colors: JSON.stringify(color),
        };

        const newNotes = [...notes];
        newNotes[currentNoteIndex] = updatedNote;
        setNotes(newNotes);

        try {
            await db.collection("your_collection_id").updateDocument(selectedNote.$id, {
                colors: JSON.stringify(color),
            });
        } catch (error) {
            console.error("Failed to update color:", error);
            alert("Error updating note color. Please try again.");
        }
    };

    return (
        <div
            onClick={changeColor}
            className="color"
            style={{ backgroundColor: color.colorHeader, cursor: "pointer" }}
        ></div>
    );
};

// ✅ Add PropTypes validation
Color.propTypes = {
    color: PropTypes.shape({
        colorHeader: PropTypes.string.isRequired, // Ensures colorHeader is a string and required
    }).isRequired,
};

export default Color;
