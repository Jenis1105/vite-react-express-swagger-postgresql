import  { useRef, FormEvent, KeyboardEvent } from 'react';

interface TodoItem {
  task: string;
  completed: boolean;
}
interface TodoFormProps {
  getItem: (item: TodoItem) => void;
}
const TodoForm: React.FC<TodoFormProps> = ({ getItem }) => {
  const itemRef = useRef<HTMLInputElement | null>(null); // create a reference to the input element

  // Function to handle form submit
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submit action
    // check if the input element is empty
    if( itemRef.current && itemRef.current.value.trim() === '' ){
      itemRef.current.focus();
    } else if(itemRef.current) {
      const item:TodoItem  = {
        task: itemRef.current.value.trim(),
        completed: false
      }
      getItem(item); // Call the getItem function from the parent component and pass the item object as child to parent communication
      itemRef.current.value = '';
    }
  };

  function onKeyEnter(e: KeyboardEvent<HTMLInputElement>){
    if(e.key === "Enter"){
      console.log("enter key pressed")
      handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
    }
  }

  return (
    <form className="mb-3 px-3 text-start d-flex justify-content-between align-items-center" onSubmit={handleSubmit}>
      <input
        type="text"
        name="Item"
        className="form-control me-2"
        id="item"
        placeholder="Be Amazing!"
        ref={itemRef} // Bind the input element to the reference
        onKeyDown={onKeyEnter}
      />
      <button type="submit" className="btn btn-sm btn-primary my-2">Add</button>
    </form>
  );
};

export default TodoForm;
