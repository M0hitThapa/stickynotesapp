import { useRef, useEffect, useState } from 'react';
import Trash from "../icons/Trash";

const NoteCard = ({ note }) => {
  const body = JSON.parse(note.body); // Parsed content of the note body
  let mouseStartPos = { x: 0, y: 0 };
  const colors = JSON.parse(note.colors); // Parsed color settings for the note
  const textAreaRef = useRef(null);
  const cardRef = useRef(null);
  const [position, setPosition] = useState(JSON.parse(note.position));

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  const autoGrow = (textAreaRef) => {
    const { current } = textAreaRef;
    if (current) {
      current.style.height = "auto";
      current.style.height = `${current.scrollHeight}px`;
    }
  };

  const mouseDown = (e) => {
    mouseStartPos = { x: e.clientX, y: e.clientY };
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

    mouseStartPos = { x: e.clientX, y: e.clientY };

    setPosition((prevPosition) => ({
      x: prevPosition.x - mouseMoveDir.x,
      y: prevPosition.y - mouseMoveDir.y,
    }));
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
        <Trash />
      </div>
      <div className="card-body">
        <textarea
          style={{ color: colors.colorText }}
          defaultValue={body.content} // Assuming `body.content` is where the main text is stored
          ref={textAreaRef}
          onInput={() => autoGrow(textAreaRef)}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
