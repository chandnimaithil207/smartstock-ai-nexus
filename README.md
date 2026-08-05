# 📦 SmartStock – AI-Powered Inventory Forecasting & Alert System

SmartStock is an AI-powered inventory management system that helps businesses forecast product demand, monitor stock levels, and receive automated low-stock alerts. It combines machine learning with a modern web dashboard to enable smarter inventory decisions and reduce stock shortages or overstocking.

---

## 🚀 Features

- 📈 AI-based demand forecasting using Random Forest Regression
- 📦 Inventory management with CRUD operations
- 🚨 Automated low-stock alerts
- 📊 Interactive dashboard for inventory visualization
- 📅 Time-series feature engineering for improved forecasting
- 🔗 RESTful APIs built with FastAPI
- ⚡ Real-time communication between frontend and backend

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Next.js
- Tailwind CSS

### Backend
- FastAPI
- Python

### Machine Learning
- Scikit-learn
- Pandas
- NumPy

### Database
- PostgreSQL (or your database)

### Tools
- Git
- GitHub
- VS Code

---

## 🧠 Machine Learning Pipeline

1. Data Collection
2. Data Cleaning & Preprocessing
3. Time-Series Feature Engineering
4. Model Training using Random Forest Regression
5. Demand Prediction
6. RMSE Evaluation
7. Forecast Visualization

---

## 📂 Project Structure

```
SmartStock-AI-Nexus/
│
├── backend/
│   ├── api/
│   ├── ml_model/
│   ├── routes/
│   ├── utils/
│   └── main.py
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── public/
│   └── styles/
│
├── dataset/
│
├── model/
│
├── screenshots/
│
├── requirements.txt
├── package.json
└── README.md
```

---

## 📊 Model Details

**Algorithm Used**
- Random Forest Regression

**Input Features**
- Historical sales
- Inventory levels
- Time-based features
- Product information

**Evaluation Metric**
- Root Mean Square Error (RMSE)

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/chandnimaithil207/smartstock-ai-nexus.git
cd smartstock-ai-nexus
```

### Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend will start at

```
http://localhost:8000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend will start at

```
http://localhost:3000
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | /inventory | Fetch inventory |
| POST | /inventory | Add product |
| PUT | /inventory/{id} | Update inventory |
| DELETE | /inventory/{id} | Delete product |
| POST | /predict | Predict future demand |
| GET | /alerts | Get low-stock alerts |

---

## 📷 Screenshots

Add screenshots here.

Example:

```
screenshots/
    dashboard.png
    prediction.png
    inventory.png
```

---

## 🎯 Future Improvements

- LSTM-based forecasting
- Multi-warehouse inventory management
- Barcode & QR scanning
- Email/SMS stock alerts
- Sales analytics dashboard
- Cloud deployment (AWS)

---

## 📈 Project Workflow

```
Historical Sales Data
          │
          ▼
 Data Cleaning & Preprocessing
          │
          ▼
 Feature Engineering
          │
          ▼
 Random Forest Model
          │
          ▼
 Demand Prediction
          │
          ▼
 Inventory Update
          │
          ▼
 Low Stock Alert
          │
          ▼
 React Dashboard
```

---

## 💡 Problem Statement

Traditional inventory systems rely on manual estimation, often leading to overstocking or stock shortages. SmartStock leverages machine learning to accurately forecast demand, helping businesses optimize inventory, reduce waste, and improve operational efficiency.

---

## 👩‍💻 Author

**Chandni Maithil**
---

## ⭐ If you found this project helpful, consider giving it a star!
