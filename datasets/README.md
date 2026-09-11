# Agricultural Datasets for AI Farmer Assistant

To train the machine learning models, you need to download the following datasets from Kaggle.

## 1. Crop Disease Dataset (PlantVillage)
- **Source**: [Kaggle - PlantVillage Dataset](https://www.kaggle.com/datasets/emmarex/plantvillage-dataset)
- **Purpose**: Train CNN model for disease detection.
- **Expected Structure**: `datasets/plantvillage/` with subfolders for each disease class.

## 2. Crop Recommendation Dataset
- **Source**: [Kaggle - Crop Recommendation Dataset](https://www.kaggle.com/datasets/vipin20/crop-recommendation-dataset) or [Nagesh Singh Chauhan's version](https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset)
- **Purpose**: Train a classification model (N, P, K, pH, etc.).
- **Expected File**: `datasets/crop_recommendation.csv`

## 3. Crop Price Dataset
- **Source**: [Kaggle - Crop Price Prediction in India](https://www.kaggle.com/datasets/himanshu007121/crop-price-prediction-in-india)
- **Purpose**: Train regression model for price prediction.
- **Expected File**: `datasets/crop_prices.csv`

## Instructions:
1. Download the datasets from the links above.
2. Place them in the `datasets/` directory as specified.
3. Run the training scripts located in `ai_models/`.
