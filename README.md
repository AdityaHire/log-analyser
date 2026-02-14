# Log Analyzer

A minimal log monitoring and analytics dashboard.

## Stack

- **Backend**: Django REST Framework
- **Frontend**: React
- **Database**: SQLite

## Setup

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## API Endpoints

- `GET /api/logs/` - List all logs
- `POST /api/logs/` - Create log
- `GET /api/logs/average-response/` - Average response time
- `GET /api/logs/slowest/` - Top 5 slowest requests
- `GET /api/logs/error-count/` - Error count per service

## Features

- Add service logs with level and response time
- View recent logs in a clean table
- Monitor analytics: average response time, slowest requests, error counts
