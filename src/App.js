import React, { useState } from 'react';

function App() {
  const [data, setData] = useState(null); // State to store fetched data
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [error, setError] = useState(null); // State to handle errors
  const [sending, setSending] = useState(false); // State to track if sending is in progress

  
  // Function to fetch data
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Sample API request (replace with your API)
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const result = await response.json();
      setData(result); // Set fetched data to state
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Function to send data to the specified endpoint
  const sendData = async () => {
    if (!data) {
      setError('No data to send');
      return;
    }

    setSending(true);
    setError(null);
    try {
      const response = await fetch('https://friendly-space-dollop-96qp49vwp6wfx7vg-7071.app.github.dev/api/MyHttpTrigger', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Sending the fetched data as JSON
      });

      if (response.ok) {
        alert('Data sent successfully!');
      } else {
        setError('Failed to send data');
      }
    } catch (err) {
      setError('Error sending data');
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={fetchData}>Fetch Data</button>
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {data && (
        <div>
          <h2>Fetched Data:</h2>
          <p><strong>Title:</strong> {data.title}</p>
          <p><strong>Body:</strong> {data.body}</p>
          <button onClick={sendData} disabled={sending}>
            {sending ? 'Sending...' : 'Send Data'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
