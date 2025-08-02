import React, { useState } from 'react';
import StatelessComponent from './StatelessComponent';

const StatefulComponent = () => {
  const [message, setMessage] = useState('Привіт, світе!');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
      <h2>StatefulComponent</h2>
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Введіть повідомлення"
      />
      <StatelessComponent text={message} />
    </div>
  );
};

export default StatefulComponent;