import React, { useState } from 'react';
const config = require('./config.json');

const RandomNumberDisplay = () => {
    const [numberArray, setNumberArray] = useState([]);
    const [error, setError] = useState(null);
    const url = config.url.concat('/', config.env);

    const fetchRandomNumberArray = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            const numbers = JSON.parse(data.body); //Important to parse the JSON Object.
            setNumberArray(numbers.number);
            setError(null);
        } catch (error) {
            console.error('Error fetching data:', error);
            setNumberArray([]);
            setError('Error fetching data. Please try again later.');
        }
    };

    return (
        <div>
            <h2>6 Digit Array:</h2>
            {error && <p>{error}</p>}
            {numberArray.length > 0 ? (
                <p>{numberArray.join(', ')}</p>
            ) : (
                <p>No array fetched yet.</p>
            )}
            <button onClick={fetchRandomNumberArray}>Fetch 6 Digit Array</button>
        </div>
    );
};

export default RandomNumberDisplay;
