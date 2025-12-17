import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = process.env.NODE_ENV === 'production' 
    ? '/api' 
    : 'http://localhost:5000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post(`${API_URL}/add`, {
        num1: parseFloat(num1),
        num2: parseFloat(num2)
      });

      if (response.data.success) {
        setResult(response.data);
      } else {
        setError(response.data.error || 'Something went wrong');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple Addition Calculator For Beginners</h1>
        <p>Add two numbers together</p>
        
        <form onSubmit={handleSubmit} className="calculator-form">
          <div className="input-group">
            <input
              type="number"
              step="any"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              placeholder="Enter first number"
              required
            />
            <span className="plus-sign">+</span>
            <input
              type="number"
              step="any"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              placeholder="Enter second number"
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="calculate-btn"
          >
            {loading ? 'Calculating...' : 'Calculate Sum'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {result && (
          <div className="result-container">
            <h2>Result:</h2>
            <div className="result">
              {result.message}
            </div>
            <div className="details">
              The sum is: <strong>{result.result}</strong>
            </div>
          </div>
        )}

        <div className="instructions">
          <h3>How to deploy on AWS:</h3>
          <ol>
            <li>Backend: Deploy to Elastic Beanstalk or EC2</li>
            <li>Frontend: Build and deploy to S3 + CloudFront</li>
            <li>Database (if needed): Use RDS</li>
          </ol>
        </div>
      </header>
    </div>
  );
}

export default App;
// Test comment
