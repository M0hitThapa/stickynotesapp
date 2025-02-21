import PropTypes from "prop-types"; // ✅ Import PropTypes
import Trash from "../icons/Trash";
import { db } from "../appwrite/database.jsx";
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

const DeleteButton = ({ noteId }) => {
    const { setNotes } = useContext(NotesContext);

    const handleDelete = async () => { // ✅ Removed unused 'e' parameter
        try {
            await db.collection("your_collection_id").deleteDocument(noteId); // ✅ Corrected Appwrite delete syntax
            setNotes((prevState) => prevState.filter((note) => note.$id !== noteId));
        } catch (error) {
            console.error("Failed to delete note:", error);
        }
    };

    return (
        <div onClick={handleDelete} style={{ cursor: "pointer" }}> {/* ✅ Added pointer cursor for better UX */}
            <Trash />
        </div>
    );
};

// ✅ Add PropTypes validation
DeleteButton.propTypes = {
    noteId: PropTypes.string.isRequired, // Ensures noteId is a required string
};

export default DeleteButton;
