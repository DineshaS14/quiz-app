import React, { useState, useContext, FormEvent } from 'react';
import { UserContext } from './UserContext';


// Define the props for UserForm
interface UserFormProps {
  onSubmit: (userName: string) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [inputName, setInputName] = useState<string>(''); // State for form input
  const { setName } = useContext(UserContext); // Access context
  
  // Handle form submission
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setName(inputName);  // Set the name in context
    onSubmit(inputName);
    window.history.pushState({}, '', '/quiz');  // Change the URL without reloading the page
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);  // Dispatch a navigation event
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">What is your name?</label>
      <input
        type="text"
        id="name"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)} // Update input value state
        placeholder="Your name"
        required
      />
      <button type="submit">Start Quiz</button>
    </form>
  );
};

export default UserForm;
