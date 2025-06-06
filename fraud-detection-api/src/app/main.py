# src/app/main.py

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from typing import List, Dict
import json
from datetime import datetime
import os

app = FastAPI(
    title="FraudEye API",
    description="API for fraud detection in financial transactions",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for transactions (replace with database in production)
transactions = []
fraud_results = []

@app.post("/fraud/upload")
async def upload_transactions(file: UploadFile = File(...)):
    """
    Upload a CSV file containing transaction data
    """
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are allowed")
    
    try:
        # Read CSV file
        df = pd.read_csv(file.file)
        required_columns = ['transaction_id', 'amount', 'timestamp', 'merchant_id', 'customer_id']
        
        # Validate required columns
        if not all(col in df.columns for col in required_columns):
            raise HTTPException(
                status_code=400,
                detail=f"CSV must contain these columns: {', '.join(required_columns)}"
            )
        
        # Convert DataFrame to list of dictionaries
        transactions_data = df.to_dict('records')
        transactions.extend(transactions_data)
        
        return {"message": f"Successfully uploaded {len(transactions_data)} transactions"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/fraud/results")
async def get_fraud_results():
    """
    Get all detected fraudulent transactions
    """
    return {"fraudulent_transactions": fraud_results}

@app.post("/fraud/predict")
async def predict_fraud(transaction: Dict):
    """
    Predict fraud probability for a single transaction
    """
    # TODO: Integrate with AI model
    # For now, return a mock prediction
    return {
        "transaction_id": transaction.get("transaction_id"),
        "fraud_probability": 0.0,  # Will be replaced with actual model prediction
        "is_fraudulent": False
    }

@app.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}