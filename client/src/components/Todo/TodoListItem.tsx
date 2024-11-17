import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { RxDragHandleDots2 } from "react-icons/rx";

type Todo = {
  id: string;
  task: string;
  completed: boolean;
};

type TodoListItemProps = {
  message: Todo; // The todo item object
  index: number; // The index of the todo item in the items array
  deleteItem: () => void; // Function to delete a todo item
  onSaveChanges: (index: number, editedMessage: string) => void; // Function to save changes to a todo item
  onCheckboxChange: (index: number, checked: boolean) => void; // Function to handle checkbox changes
};

const TodoListItem: React.FC<TodoListItemProps> = ({
  message,
  index,
  deleteItem,
  onSaveChanges,
  onCheckboxChange,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false); // State for edit mode
  const [editedMessage, setEditedMessage] = useState<string>(message.task); // State for the edited message
  const [showOptionsMenu, setShowOptionsMenu] = useState<boolean>(false); // State for options menu visibility

  const inputRef = useRef<HTMLInputElement>(null); // Reference to the input element

  useEffect(() => {
    // Focus the input field when in edit mode
    if (editMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editMode]);

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedMessage(event.target.value);
  };

  // Handle checkbox change
  const handleCheckboxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(index, event.target.checked);
  };

  // Save changes to the todo item
  const handleSaveChanges = () => {
    onSaveChanges(index, editedMessage);
    toggleEditMode();
  };

  // Toggle the options menu visibility
  const toggleOptionsMenu = () => {
    setShowOptionsMenu(!showOptionsMenu);
  };

  // Handle pressing Escape key to exit edit mode
  const handleKeyEscape = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setEditedMessage(message.task);
      toggleEditMode();
    }
  };

  // Handle pressing Enter key to save changes
  const handleKeySave = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSaveChanges();
    }
  };

  return (
    <div className="d-flex mx-2 border-bottom p-3 justify-content-between align-items-center">
      {editMode ? (
        <input
          type="text"
          value={editedMessage}
          onChange={handleInputChange}
          onKeyDown={(event) => {
            handleKeyEscape(event);
            handleKeySave(event);
          }}
          ref={inputRef}
        />
      ) : (
        <div className="d-flex align-content-center">
          <div className="form-check">
            <input
              className="form-check-input me-2"
              type="checkbox"
              checked={message.completed}
              onChange={handleCheckboxInputChange}
              id={`checkbox-${index}`}
            />
          </div>
          <div>{message.task}</div>
        </div>
      )}

      <div>
        {editMode ? (
          <button
            className="btn btn-sm btn-success mx-2"
            onClick={handleSaveChanges}
          >
            Save
          </button>
        ) : (
          <OptionsMenu className="options-menu">
            <RxDragHandleDots2 className="fs-4" onClick={toggleOptionsMenu} />
            {showOptionsMenu && (
              <OptionsMenuContent>
                <button
                  className="btn btn-sm btn-light"
                  onClick={toggleEditMode}
                >
                  Edit
                </button>
                <button className="btn btn-sm btn-light" onClick={deleteItem}>
                  Delete
                </button>
              </OptionsMenuContent>
            )}
          </OptionsMenu>
        )}
      </div>
    </div>
  );
};

export default TodoListItem;

const OptionsMenu = styled.div`
  position: relative;
`;

const OptionsMenuContent = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 1;
`;
