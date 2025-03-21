# src/app/main.py

from fastapi import FastAPI
from app.routes import fraud

app = FastAPI(title="Fraud Detection API")

# Include routes
app.include_router(fraud.router, prefix="/fraud", tags=["Fraud Detection"])

@app.get("/")
def root():
    return {"message": "Fraud Detection API is running"}