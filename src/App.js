import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Assuming you have custom CSS for styling
const config = require('./config.json');

const App = () => {
    const [number, setNumber] = useState(null);
    const [buttonClicked, setButtonClicked] = useState(false);
    const url = config.url.concat('/', config.env);

    const handleButtonClick = async () => {
        setButtonClicked(true);
        // Call API to generate 6 digit number
        try {
            const response = await fetch(url);
            const data = await response.json();
            const numbers = JSON.parse(data.body); //Important to parse the JSON Object.
            setNumber(numbers.number);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (//!buttonClicked && 
        <div className="container d-flex flex-column align-items-center justify-content-center">

            {number && (
                <div className="number-display mt-5">
                    <div className="black-box">
                        {number.slice(0, 5).map((digit, index) => (
                            <div key={index} className="digit">{digit}</div>
                        ))}
                    </div>
                    <div className="red-box">
                        <div className="digit">{number.slice(-1)}</div>
                    </div>
                </div>
            )}
            {(
                <button className="btn btn-danger mt-5" onClick={handleButtonClick}>
                    Generate Magical Number
                </button>
            )}
        </div>
    );
};

export default App;
