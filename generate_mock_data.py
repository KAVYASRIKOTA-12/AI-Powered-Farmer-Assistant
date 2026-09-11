import os
import pandas as pd
import numpy as np
from PIL import Image

def generate_mock_datasets():
    # 1. Crop Recommendation Data
    rec_data = {
        'N': np.random.randint(0, 140, 100),
        'P': np.random.randint(5, 145, 100),
        'K': np.random.randint(5, 205, 100),
        'temperature': np.random.uniform(8.0, 43.0, 100),
        'humidity': np.random.uniform(14.0, 99.0, 100),
        'ph': np.random.uniform(3.5, 9.9, 100),
        'rainfall': np.random.uniform(20.0, 298.0, 100),
        'label': np.random.choice(['rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas'], 100)
    }
    pd.DataFrame(rec_data).to_csv('datasets/crop_recommendation.csv', index=False)
    print("Generated mock crop_recommendation.csv")

    # 2. Crop Price Data
    price_data = {
        'State': np.random.choice(['Maharashtra', 'Punjab', 'Gujarat', 'Karnataka'], 100),
        'District': np.random.choice(['Pune', 'Ludhiana', 'Surat', 'Bangalore'], 100),
        'Crop': np.random.choice(['Wheat', 'Rice', 'Cotton', 'Sugarcane'], 100),
        'Month': np.random.randint(1, 13, 100),
        'Year': np.random.randint(2018, 2024, 100),
        'Price': np.random.uniform(1000, 5000, 100)
    }
    pd.DataFrame(price_data).to_csv('datasets/crop_prices.csv', index=False)
    print("Generated mock crop_prices.csv")

    # 3. PlantVillage (Images)
    classes = ['Tomato_Late_blight', 'Potato_Early_blight', 'Apple_Scab', 'Healthy_Leaf']
    base_dir = "datasets/PlantVillage"
    
    # Ensure empty main map structure
    if not os.path.exists(base_dir):
        os.makedirs(base_dir, exist_ok=True)
        
    for cls in classes:
        os.makedirs(os.path.join(base_dir, cls), exist_ok=True)
        for i in range(10):  # 10 images per class
            # Create a random noise image
            img_array = np.random.randint(0, 255, (224, 224, 3), dtype=np.uint8)
            img = Image.fromarray(img_array)
            img.save(os.path.join(base_dir, cls, f"mock_{i}.jpg"))
            
    print("Generated mock PlantVillage dataset folders with sample images")

if __name__ == '__main__':
    generate_mock_datasets()
