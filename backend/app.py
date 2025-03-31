from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

app = Flask(__name__)

# Load dataset
df = pd.read_csv("startup_dataset_updated.csv")

# Load encoders
with open("encoders.pkl", "rb") as f:
    encoders = pickle.load(f)

# Split data
X = df.drop(columns=["success"])
y = df["success"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train RandomForest model
# model = RandomForestClassifier(n_estimators=100, random_state=42,class_weight="balanced")
model = RandomForestClassifier(n_estimators=50, max_depth=10, class_weight="balanced", random_state=42)

model.fit(X_train, y_train)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    
    try:
        # Encode input data
        input_data = pd.DataFrame({
            col: [encoders[col].transform([data[col]])[0]]
            for col in ["industry", "budget", "team_size", "market_size", "country"]
        })
    except ValueError as e:
        return jsonify({"error": f"Invalid category in input: {str(e)}"}), 400
    
    # Predict probability
    print(model.predict_proba(X_test[:5]))  # Check success vs. failure probabilities

    prob = model.predict_proba(input_data)[0]
    success_rate = round(prob[1] * 100, 2)
    failure_rate = round(prob[0] * 100, 2)

    # Identify important risk factors
    feature_importance = model.feature_importances_
    feature_names = X.columns
    sorted_indices = np.argsort(feature_importance)[::-1]
    top_factors = [feature_names[i] for i in sorted_indices[:3]]  # Top 3 risk factors

    # Explain the risk factors based on input data
    risk_messages = {
        "industry": {
            "Technology & SaaS": "High competition in tech startups, requiring strong differentiation.",
            "Healthcare & Biotech": "Regulatory hurdles and long R&D cycles increase risk.",
            "Fintech & Finance": "Strict financial regulations and trust-building challenges.",
            "E-commerce & Retail": "Heavy marketing costs and logistics complexity.",
            "Education & EdTech": "Slow adoption rates and high content creation costs.",
            "Food & Beverage": "Perishable inventory and supply chain challenges.",
            "Transportation & Logistics": "High operational costs and regulatory issues.",
            "Real Estate & PropTech": "Market fluctuations and high capital investment risks.",
            "Media & Entertainment": "Changing consumer trends and monetization challenges.",
            "Energy & CleanTech": "High infrastructure costs and long ROI periods.",
            "Manufacturing": "Large upfront investment and supply chain dependencies.",
            "Other": "Unclear industry risks due to undefined category."
        },
        "budget": {
            "bootstrap": "Limited funds may slow growth and limit scalability.",
            "seed": "Early-stage funding is unstable and might not last long.",
            "angel": "Depends on investors' risk appetite, which may change.",
            "series_a": "Pressure to scale rapidly, which may lead to burnout.",
            "series_b": "Investor expectations for high revenue growth.",
            "series_c": "High valuation pressure; failure to grow fast can be risky."
        },
        "team_size": {
            "solo": "Single founder startups struggle with workload and decision-making.",
            "small": "Limited manpower can slow execution speed.",
            "medium": "Risk of inefficiency due to growing team coordination challenges.",
            "large": "High operational costs and possible leadership conflicts.",
            "enterprise": "Bureaucracy may slow innovation and agility."
        },
        "market_size": {
            "niche": "Small customer base; harder to scale.",
            "medium": "Competition from both small and large players.",
            "large": "Crowded market; requires strong differentiation.",
            "massive": "High potential but extremely competitive."
        },
        "country": {
            "in": "Regulatory complexity and evolving startup ecosystem.",
            "us": "High competition and expensive talent pool.",
            "uk": "Strict business laws and Brexit-related uncertainties.",
            "ca": "Limited domestic market size.",
            "au": "Distant global markets; high operational costs.",
            "de": "Strict labor laws and high operational costs.",
            "fr": "Bureaucratic hurdles for business operations.",
            "jp": "Cultural challenges in startup adoption.",
            "sg": "Favorable business climate but small market size.",
            "br": "Economic instability and complex tax system."
        }
    }

    risk_explanations = [
        risk_messages[factor].get(data[factor], "No specific risk identified.") 
        for factor in top_factors
    ]

    return jsonify({
        "success_rate": f"{success_rate}%",
        "failure_rate": f"{failure_rate}%",
        "risk_factors": risk_explanations
    })

if __name__ == "__main__":
    app.run(debug=True)

