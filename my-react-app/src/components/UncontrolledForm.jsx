import { useRef } from 'react';

export function UncontrolledForm() {
  const nameRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted: ${nameRef.current.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Uncontrolled Form</h2>
      <input ref={nameRef} type="text" placeholder="Enter your name" />
      <button type="submit">Submit</button>
    </form>
  );
}