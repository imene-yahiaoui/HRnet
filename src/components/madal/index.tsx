import React, { useEffect, useRef } from "react";
import "./style.css";

/**
 * Modal component to display a dialog box.
 * @param {Object} props - The props object.
 * @param {Function} props.closeModalFunction - Function to close the modal.
 * @param {string|null} props.message - The message content of the modal.
 * @param {string|null} props.closeBtn - Label for the close button.
 * @param {string|null} props.xBtn - Label for the close 'x' button.
 * @param {Function} props.closeModalBtn - Function to close the modal when a custom close button is clicked.
 * @return {JSX.Element} Modal component.
 */
const Modal: React.FC<ModalProps> = ({
  closeModalFunction,
  message,
  closeBtn,
  xBtn,
  closeModalBtn,
}) => {
  // Reference to the modal container
  const modalRef = useRef<HTMLDivElement>(null);

  /**
   * Handles keyboard events to close the modal.
   * @param {KeyboardEvent} e - The keyboard event object.
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        closeModalFunction();
      } else if (e.key === "Enter") {
        closeModalBtn();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Focus the modal when mounted
    if (modalRef.current) {
      modalRef.current.focus();
    }

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModalFunction, closeModalBtn]);

  /**
   * Prevents event propagation when the modal container is clicked.
   * @param {React.MouseEvent} e - The mouse event object.
   */
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="modal-overlay"
      onClick={closeModalFunction}
      tabIndex={-1} // Allow focusing
    >
      <div
        className="modal-container"
        onClick={stopPropagation}
        ref={modalRef}
        tabIndex={0} // Allow focusing
      >
        <button className="close-x-btn" onClick={closeModalFunction}>
          {xBtn}
        </button>
        <h2>{message}</h2>
        <button className="close-btn" onClick={closeModalBtn}>
          {closeBtn}
        </button>
      </div>
    </div>
  );
};

export default Modal;
