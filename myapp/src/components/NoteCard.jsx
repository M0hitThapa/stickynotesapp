import { useRef, useEffect, useState } from 'react';
import Trash from "../icons/Trash";
import { setZIndex } from '../utils';
import PropTypes from 'prop-types'; // Import PropTypes

const NoteCard = ({ note }) => {
  const body = JSON.parse(note.body); // Parsed content of the note body
  let mouseStartPos = { x: 0, y: 0 };
  const colors = JSON.parse(note.colors); // Parsed color settings for the note
  const textAreaRef = useRef(null);
  const cardRef = useRef(null);
  const [position, setPosition] = useState(JSON.parse(note.position));
  const [bodyContent, setBodyContent] = useState(body.content); // State for the content

  useEffect(() => {
    autoGrow(textAreaRef);
  }, [bodyContent]);

  const autoGrow = (textAreaRef) => {
    const { current } = textAreaRef;
    if (current) {
      current.style.height = "auto";
      current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  };

  const mouseDown = (e) => {
    setZIndex(cardRef.current);

    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;
 
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  };

  const mouseMove = (e) => {
    const mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    setPosition({
      x: cardRef.current.offsetLeft - mouseMoveDir.x,
      y: cardRef.current.offsetTop - mouseMoveDir.y,
    });
  };

  const handleDelete = () => {
    setBodyContent(''); // Clear the body content
  };

  const handleInputChange = (e) => {
    setBodyContent(e.target.value); // Update body content as user types
  };

  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: 'absolute',
      }}
    >
      {/* Header with optional background color */}
      <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
        onMouseDown={mouseDown}
      >
        {body.title && <h3>{body.title}</h3>}
        <button onClick={handleDelete} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Trash /> {/* Trash icon as a button */}
        </button>
      </div>
      <div className="card-body">
        <textarea
          onFocus={() => setZIndex(cardRef.current)}
          style={{ color: colors.colorText }}
          value={bodyContent} // Controlled by state
          ref={textAreaRef}
          onInput={() => autoGrow(textAreaRef)}
          onChange={handleInputChange} // Sync state with user input
        ></textarea>

        {/* Additional UI buttons */}
        
      </div>
    </div>
  );
};

// Prop validation using PropTypes
NoteCard.propTypes = {
  note: PropTypes.shape({
    body: PropTypes.string.isRequired,
    colors: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
  }).isRequired,
};

export default NoteCard;
