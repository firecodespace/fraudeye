from sqlalchemy import Column, Integer, String, Float
from app.database import Base

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float, nullable=False)
    transaction_type = Column(String, nullable=False)
    status = Column(String, nullable=False)