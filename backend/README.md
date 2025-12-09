# Backend - Retail Sales Management System

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Place the sales_data.csv file in the `data/` directory

3. Start the server:
```bash
npm run dev
```

Server will run on http://localhost:5000

## API Endpoints

- GET /api/sales - Get sales with filters, search, sort, pagination
- GET /api/filter-options - Get available filter options
- GET /health - Health check
