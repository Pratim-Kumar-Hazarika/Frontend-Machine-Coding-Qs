import React, { createRef, useEffect, useRef } from "react";
import Note from "./Note";

function Notes({ notes, setNotes }) {
  const noteRefs = useRef({});

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    const updatedNotes = notes.map((note) => {
      const savedNote = savedNotes.find((n) => n.id == note.id);
      if (savedNote) {
        return {
          ...note,
          position: savedNote.position,
        };
      } else {
        const position = determinePosition();
        return { ...note, position };
      }
    });

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }, []);

  const determinePosition = () => {
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 250;
    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  };

  function handleDragStart(note, e) {
    const { id } = note;
    const noteRef = noteRefs.current[id];
    const rect = noteRef.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const startPos = note.position;

    let animationFrame = null;
    const hadleMouseMove = (e) => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;
        noteRef.style.left = `${newX}px`;
        noteRef.style.top = `${newY}px`;
      });
    };

    const hadleMouseUp = () => {
      document.removeEventListener("mousemove", hadleMouseMove);
      document.removeEventListener("mouseup", hadleMouseUp);
      const finalRect = noteRef.getBoundingClientRect();
      const newPosition = { x: finalRect.left, y: finalRect.top };
      if (checkForOverlap(id)) {
        // overlap → reset to old position
        noteRef.style.left = `${startPos.x}px`;
        noteRef.style.top = `${startPos.y}px`;
      } else {
        // no overlap → accept new position
        updateNodePosition(id, newPosition);
      }
    };

    document.addEventListener("mousemove", hadleMouseMove);
    document.addEventListener("mouseup", hadleMouseUp);

    const checkForOverlap = (id) => {
      const currentNote = noteRefs.current[id];
      const currentRect = currentNote.getBoundingClientRect();
      return notes.some((note) => {
        if (note.id == id) return false;

        const otherNoteRef = noteRefs.current[note.id];
        const otherNoteRect = otherNoteRef.getBoundingClientRect();

        const overlap = !(
          currentRect.right < otherNoteRect.left ||
          currentRect.left > otherNoteRect.right ||
          currentRect.bottom < otherNoteRect.top ||
          currentRect.top > otherNoteRect.bottom
        );
        return overlap;
      });
    };
  }

  const updateNodePosition = (id, newPosition) => {
    const updatedNotes = notes.map((note) =>
      note.id == id ? { ...note, position: newPosition } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };
  return (
    <div>
      {notes.map((item) => {
        return (
          <Note
            key={item.id}
            ref={(el) => (noteRefs.current[item.id] = el)}
            {...item}
            initialPosition={item.position}
            onMouseDown={(e) => handleDragStart(item, e)}
          />
        );
      })}
    </div>
  );
}

export default Notes;
