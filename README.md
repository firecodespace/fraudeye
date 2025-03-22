# 🚀 Fraud Detection System

## 📌 Overview
This project is a **Fraud Detection System** that processes financial transactions, applies rule-based detection, and uses an AI model to enhance fraud detection. The backend is built with **FastAPI**, the frontend uses **React**, and fraud detection is improved using an **AI model trained by the team**.

---

## 📁 Project Structure
```
fraud-detection-system/
│── frontend/                  # React-based frontend
│── backend/                   # FastAPI backend
│   ├── src/
│   │   ├── app/
│   │   │   ├── models/        # Database models
│   │   │   ├── routes/        # API endpoints
│   │   │   ├── services/      # Rule-based fraud detection
│   │   │   ├── ai_model.py    # AI-based fraud detection
│   │   │   ├── main.py        # FastAPI entry point
│   │   ├── database.py        # Database connection
│   │   ├── config.py          # Environment variables & settings
│   ├── tests/                 # Unit tests
│── ai_model/                  # AI Model training and inference
│   ├── model.pkl              # Trained AI model
│   ├── train_model.py         # Model training script
│   ├── predict.py             # Model inference script
│── .env                       # Environment variables
│── docker-compose.yml         # Docker configuration
│── README.md                  # Project documentation
```

---

## ⚙️ Backend (FastAPI)
The backend is responsible for processing transaction data, applying fraud detection rules, and integrating the AI model.

### 🔹 Features
✅ Accepts a **CSV file of transactions** from the frontend  
✅ **User-specified rules** for fraud detection  
✅ **AI model integration** for enhanced fraud prediction  
✅ **PostgreSQL database** for storing transactions  
✅ **REST API** built with FastAPI  

### 🛠️ Setup & Run Backend
```sh
# Navigate to backend directory
cd backend

# Set up environment variables
cp .env.example .env

# Build and start backend using Docker
docker-compose up --build
```
Once running, access **API documentation** at:  
🔗 `http://localhost:8000/docs`

---

## 🌐 Frontend (React)
The frontend allows users to **upload CSV files**, define **fraud detection rules**, and view **fraudulent transactions**.

### 🔹 Features
✅ **File upload** for transaction data  
✅ **Rule selection** for fraud detection  
✅ **Displays results** after fraud analysis  
✅ **Real-time status updates** from backend  

### 🛠️ Setup & Run Frontend
```sh
# Navigate to frontend directory
cd frontend

# Install dependencies
yarn install  # or npm install

# Start the frontend
yarn start  # or npm start
```
The app will be available at:  
🔗 `http://localhost:3000`

---

## 🧠 AI Model (Fraud Detection)
The AI model is used for advanced fraud detection beyond rule-based checks.

### 🔹 Features
✅ **Trained on past transaction data** to detect fraud patterns  
✅ **Predicts fraud probability** for new transactions  
✅ **Works alongside rule-based detection** for better accuracy  

### 🛠️ Train & Use AI Model
```sh
# Navigate to AI model directory
cd ai_model

# Train the model
python train_model.py

# Test predictions
python predict.py --input sample_transaction.json
```

---

## 🚀 Deployment
The entire system can be deployed using **Docker** and **Docker Compose**.
```sh
docker-compose up --build
```

For **production**, you can deploy the backend using **Gunicorn** and the frontend on **Vercel** or **Netlify**.

---

## 📜 API Endpoints
### 🔹 Upload Transactions (CSV)
```http
POST /fraud/upload
```
📌 Accepts a CSV file of transactions for fraud detection.

### 🔹 Get Fraud Results
```http
GET /fraud/results
```
📌 Returns detected fraudulent transactions.

### 🔹 AI Model Prediction
```http
POST /fraud/predict
```
📌 Sends transaction data to AI model for fraud probability.

---

## 📌 Contributors
👨‍💻 **Backend Engineer:** Aditya  
🎨 **Frontend Developer:** Yash Bendersh
🧠 **AI Model Developer:** Agastya Dahiya

---

## 📄 License
This project is open-source and licensed under the **MIT License**.

