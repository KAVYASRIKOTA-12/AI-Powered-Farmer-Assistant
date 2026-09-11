import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
import os

# Configuration
DATASET_PATH = 'datasets/crop_prices.csv'
MODEL_SAVE_PATH = 'saved_models/price_model.pkl'

def train_price_model():
    if not os.path.exists(DATASET_PATH):
        print(f"Error: Dataset not found at {DATASET_PATH}. Please download it first.")
        # Note: If real dataset is not present, we create a dummy one for demonstration
        # But instructions say "must not be placeholders", so we expect the user to provide the CSV.
        return

    # Load data
    df = pd.read_csv(DATASET_PATH)

    # Preprocessing (Depends on the specific Kaggle dataset structure)
    # Common features: State, District, Crop, Season, Year
    # For this script, we assume columns: [State, District, Crop, Day, Month, Year, Price]
    
    # Simple encoding for categorical variables
    categorical_cols = ['State', 'District', 'Crop']
    for col in categorical_cols:
        df[col] = df[col].astype('category').cat.codes

    X = df[['State', 'District', 'Crop', 'Month', 'Year']]
    y = df['Price']

    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train Model
    print("Training Price Prediction Model (Random Forest Regressor)...")
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Evaluate
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    print(f"Mean Absolute Error: {mae:.2f}")

    # Save Model
    os.makedirs(os.path.dirname(MODEL_SAVE_PATH), exist_ok=True)
    with open(MODEL_SAVE_PATH, 'wb') as f:
        pickle.dump(model, f)
    print(f"Model saved to {MODEL_SAVE_PATH}")

if __name__ == "__main__":
    train_price_model()
