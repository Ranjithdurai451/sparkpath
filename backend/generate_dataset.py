# import numpy as np
# import pandas as pd
# import pickle
# from sklearn.preprocessing import LabelEncoder

# # Generate synthetic dataset
# np.random.seed(42)
# data_size = 1000
# df = pd.DataFrame({
#     "industry": np.random.choice([
#         "Technology & SaaS", "Healthcare & Biotech", "Fintech & Finance",
#         "E-commerce & Retail", "Education & EdTech", "Food & Beverage",
#         "Transportation & Logistics", "Real Estate & PropTech",
#         "Media & Entertainment", "Energy & CleanTech", "Manufacturing", "Other"
#     ], data_size),
#     "budget": np.random.choice(["bootstrap", "seed", "angel", "series_a", "series_b", "series_c"], data_size),
#     "team_size": np.random.choice(["solo", "small", "medium", "large", "enterprise"], data_size),
#     "market_size": np.random.choice(["niche", "medium", "large", "massive"], data_size),
#     "country": np.random.choice(["india", "united_states", "united_kingdom", "canada", "australia", "germany", "france", "japan", "singapore", "brazil"], data_size),
#     "success": np.random.choice([0, 1], data_size, p=[0.5, 0.5])  # 60% failure, 40% success
# })

# # Encode categorical variables and store encoders
# encoders = {}
# for col in ["industry", "budget", "team_size", "market_size", "country"]:
#     encoders[col] = LabelEncoder()
#     df[col] = encoders[col].fit_transform(df[col])

# # Save dataset
# df.to_csv("startup_dataset.csv", index=False)

# # Save encoders
# with open("encoders.pkl", "wb") as f:
#     pickle.dump(encoders, f)

# print("Dataset and encoders saved successfully.")


import numpy as np
import pandas as pd
import pickle
from sklearn.preprocessing import LabelEncoder

# Set random seed for reproducibility
np.random.seed(42)

# Define dataset size
data_size = 5000  # Increased data for better learning

# Define startup categories
industries = [
    "Technology & SaaS", "health", "finance",
    "e-commerce", "education", "food",
    "transportation", "real_estate",
    "media", "energy", "manufacturing", "other"
]

budgets = ["bootstrap", "seed", "angel", "series_a", "series_b", "series_c"]
team_sizes = ["solo", "small", "medium", "large", "enterprise"]
market_sizes = ["niche", "medium", "large", "massive"]
countries = ["india", "united_states", "united_kingdom", "canada", "australia", 
             "germany", "france", "japan", "singapore", "brazil"]

# Generate synthetic dataset with improved accuracy logic
data = []
for _ in range(data_size):
    industry = np.random.choice(industries)
    budget = np.random.choice(budgets)
    team_size = np.random.choice(team_sizes)
    market_size = np.random.choice(market_sizes)
    country = np.random.choice(countries)
    
    # Define failure probability based on business factors
    failure_probability = 0.7  # Default 70% failure rate
    
    if budget in ["series_b", "series_c"]:
        failure_probability -= 0.15  # More funding → lower failure
    
    if team_size in ["large", "enterprise"]:
        failure_probability -= 0.10  # Bigger team → lower failure
    
    if market_size == "massive":
        failure_probability -= 0.05  # Large markets have more opportunities

    if industry in ["health", "finance"]:
        failure_probability += 0.10  # These industries have higher risks

    # Ensure probability stays within bounds
    failure_probability = max(0.2, min(failure_probability, 0.85))  

    # Assign success (1) or failure (0) based on probability
    success = np.random.choice([0, 1], p=[failure_probability, 1 - failure_probability])

    # Append row
    data.append([industry, budget, team_size, market_size, country, success])

# Convert to DataFrame
df = pd.DataFrame(data, columns=["industry", "budget", "team_size", "market_size", "country", "success"])

# Encode categorical variables and store encoders
encoders = {}
for col in ["industry", "budget", "team_size", "market_size", "country"]:
    encoders[col] = LabelEncoder()
    df[col] = encoders[col].fit_transform(df[col])

# Save updated dataset
df.to_csv("startup_dataset_updated.csv", index=False)

# Save encoders
with open("encoders.pkl", "wb") as f:
    pickle.dump(encoders, f)

print("Updated dataset and encoders saved successfully.")
