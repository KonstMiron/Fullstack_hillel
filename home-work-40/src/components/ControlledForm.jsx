import { useState } from 'react';

export function ControlledForm() {
  const [formData, setFormData] = useState({
    name: '',
    agree: false,
    color: 'red',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted: ${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Controlled Form</h2>
      <input
        name="name"
        type="text"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
      />
      <label>
        <input
          name="agree"
          type="checkbox"
          checked={formData.agree}
          onChange={handleChange}
        />
        I agree
      </label>
      <select name="color" value={formData.color} onChange={handleChange}>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}