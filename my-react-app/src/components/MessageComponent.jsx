import { use } from 'react';


const fetchMessage = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() > 0.5;
      if (shouldFail) {
        reject(new Error('Failed to fetch message'));
      } else {
        resolve("Hello, world!");
      }
    }, 1000);
  });
};

const messagePromise = fetchMessage().catch(() => 'No message available');

const MessageComponent = ({ messagePromise }) => {
  const message = use(messagePromise);
  return <p>{message}</p>;
};

const App = () => (
  <MessageComponent messagePromise={messagePromise} />
);

export default App;