import { useState, useEffect } from "react";
import axios from "axios";

export default function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setData(response.data);
      } catch (err) {
        setError("Помилка завантаження даних");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Завантаження даних...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Список користувачів:</h2>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}