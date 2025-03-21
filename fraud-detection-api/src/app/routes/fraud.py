from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.services.fraud_service import detect_fraud

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/detect")
def detect(transaction: dict, db: Session = Depends(get_db)):
    result = detect_fraud(transaction, db)
    return {"fraudulent": result}
