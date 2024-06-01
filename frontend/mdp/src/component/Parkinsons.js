import React, { useState } from "react";

const ParkinsonsApp = () => {
  const [formValues, setFormValues] = useState({
    "MDVP:Fo(Hz)": 100,
    "MDVP:Fhi(Hz)": 150,
    "MDVP:Flo(Hz)": 50,
    "MDVP:Jitter(%)": 0.5,
    "MDVP:Jitter(Abs)": 0.03,
    "MDVP:RAP": 0.2,
    "MDVP:PPQ": 0.1,
    "Jitter:DDP": 0.6,
    "MDVP:Shimmer": 0.02,
    "MDVP:Shimmer(dB)": 0.2,
    "Shimmer:APQ3": 0.01,
    "Shimmer:APQ5": 0.02,
    "MDVP:APQ": 0.03,
    "Shimmer:DDA": 0.03,
    NHR: 0.02,
    HNR: 21,
    RPDE: 0.5,
    DFA: 0.8,
    spread1: -4.5,
    spread2: 0.2,
    D2: 2,
    PPE: 0.3,
   });

  const [predictions, setPredictions] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handlePredict = async () => {
    // Convert form values to an array
    const inputArray = Object.values(formValues).map(Number);

    try {
      // Send input data to the Flask backend for Parkinson's prediction
      const response = await fetch("http://localhost:5001/predict_parkinsons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input_data: inputArray }),
      });

      if (!response.ok) {
        throw new Error("Failed to get predictions");
      }

      // Get predictions from the backend
      const data = await response.json();
      setPredictions(data.parkinsons_prediction);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="container parkinsons-disease-background">
        <div className="parkinsons-disease-box">
          <div className="parkinsons-title">Parkinson's Disease Prediction</div>
          <form className="parkinsons-disease-columns-container">
            {Object.entries(formValues).map(([name, value]) => (
              <div key={name} className="input-pair">
                <label className="label">{name}:</label>
                <input
                  type="number"
                  className="input-field"
                  name={name}
                  value={value}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </form>
          <button className="button" onClick={handlePredict}>Predict</button>
          <div>
            <h3>Predictions:</h3>
            <ul>
              {predictions.map((prediction, index) => (
                <li key={index}>{prediction}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  );
}

export default ParkinsonsApp;
