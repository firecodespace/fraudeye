from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://user:password@localhost/fraud_db"
    SECRET_KEY: str = "supersecretkey"
    
    class Config:
        env_file = "./.env"