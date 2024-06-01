"""
# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from aco_model import ACO  # Import the ACO class from the separate module

app = Flask(__name__)
CORS(app)

# Load the trained ACO model
loaded_aco_model = joblib.load('aco2_model.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        if 'input_data' not in data:
            raise ValueError("Input data not provided")

        input_data = np.array(data['input_data']).reshape(1, -1)

        # Get the selected features from the loaded ACO model
        selected_features = loaded_aco_model.accuracies[-1].obtainSolution_final()

        # Use the selected features to extract relevant columns from the input data for prediction
        input_data_selected = input_data[:, selected_features]

        # Make predictions
        prediction = loaded_aco_model.clf.predict(input_data_selected)
        

        # Print the prediction in the backend terminal
        print("Prediction:", prediction)

        return jsonify({'prediction': prediction.tolist()}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400



if __name__ == '__main__':
    app.run(debug=True)
"""





from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the trained heart disease model
loaded_model = joblib.load('aco2_model.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        if 'input_data' not in data:
            raise ValueError("Input data not provided")

        input_data = np.array(data['input_data']).reshape(1, -1)

        # Make predictions
        prediction = loaded_model.predict(input_data)
        probability = loaded_model.predict_proba(input_data)[0][1]  # Probability of having heart disease

        # Assign stages based on the probability
        if probability < 0.1:
            stage = "Low Risk - Cardiovascular Risk Factors"
        elif 0.1 <= probability < 0.25:
            stage = "Mild Risk - Atherosclerosis"
        elif 0.25 <= probability < 0.5:
            stage = "Moderate Risk - Angina"
        elif 0.5 <= probability < 0.75:
            stage = "High Risk - Heart Attack (Myocardial Infarction)"
        else:
            stage = "Very High Risk - Heart Failure"

        # Print the prediction and stage in the backend terminal
        print("Prediction:", prediction)
        print("Stage:", stage)

        return jsonify({'prediction': prediction.tolist(), 'stage': stage}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)






"""
# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from aco_model import ACO  # Import the ACO class from the separate module

app = Flask(__name__)
CORS(app)

# Load the trained ACO model
loaded_aco_model = joblib.load('aco2_model.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        if 'input_data' not in data:
            raise ValueError("Input data not provided")

        input_data = np.array(data['input_data']).reshape(1, -1)

        # Get the selected features from the loaded ACO model
        selected_features = loaded_aco_model.accuracies[-1].obtainSolution_final()

        # Use the selected features to extract relevant columns from the input data for prediction
        input_data_selected = input_data[:, selected_features]

        # Print debugging statements
        print("Selected Features:", selected_features)
        print("Input Data (Selected):", input_data_selected)

        # Ensure input_data_selected has non-zero features
        if input_data_selected.shape[1] == 0:
            return jsonify({'error': 'Input data has zero features after feature selection.'}), 400

        # Make predictions
        try:
            prediction = loaded_aco_model.clf.predict(input_data_selected)
            probability = loaded_aco_model.clf.predict_proba(input_data_selected)[0][1]  # Probability of having heart disease

            # Assign stages based on the probability
            if probability < 0.1:
                stage = "Low Risk - Cardiovascular Risk Factors"
            elif 0.1 <= probability < 0.25:
                stage = "Mild Risk - Atherosclerosis"
            elif 0.25 <= probability < 0.5:
                stage = "Moderate Risk - Angina"
            elif 0.5 <= probability < 0.75:
                stage = "High Risk - Heart Attack (Myocardial Infarction)"
            else:
                stage = "Very High Risk - Heart Failure"

            # Print the prediction in the backend terminal
            print("Prediction:", prediction)
            print("Stage:", stage)

            return jsonify({'prediction': prediction.tolist(), 'stage': stage}), 200
        except ValueError as ve:
            return jsonify({'error': str(ve)}), 400
        except Exception as e:
            return jsonify({'error': str(e)}), 400

    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)
"""