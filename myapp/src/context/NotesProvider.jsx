import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../icons/Spinner";
import { db } from "../appwrite/database";
import { NotesContext } from "./NotesContext";

const NotesProvider = ({ children }) => {
    const [selectedNote, setSelectedNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState();

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        const response = await db.notes.list();
        setNotes(response.documents);
        setLoading(false);
    };

    const contextData = { notes, setNotes, selectedNote, setSelectedNote };

    return (
        <NotesContext.Provider value={contextData}>
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                    }}
                >
                    <Spinner size="100" />
                </div>
            ) : (
                children
            )}
        </NotesContext.Provider>
    );
};

NotesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default NotesProvider;
