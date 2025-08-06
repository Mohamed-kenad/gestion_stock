<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laravel API - Stock Management</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            color: #333;
        }
        .api-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .endpoint {
            background: #e9ecef;
            padding: 10px;
            margin: 10px 0;
            border-radius: 3px;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏪 Stock Management System API</h1>
            <p>Laravel Backend is Running Successfully!</p>
        </div>
        
        <div class="api-info">
            <h3>📡 Available API Endpoints:</h3>
            <div class="endpoint">POST /api/register - User Registration</div>
            <div class="endpoint">POST /api/login - User Login</div>
            <div class="endpoint">GET /sanctum/csrf-cookie - Get CSRF Cookie</div>
            <div class="endpoint">GET /api/user - Get Authenticated User (Protected)</div>
        </div>
        
        <div class="api-info">
            <h3>🔧 Frontend Connection:</h3>
            <p>Your React frontend should connect to: <strong>http://localhost:8000/api</strong></p>
            <p>CORS is configured for: <strong>http://localhost:5173</strong></p>
        </div>
        
        <div class="api-info">
            <h3>🔒 Security Features:</h3>
            <ul>
                <li>✅ CSRF Protection enabled</li>
                <li>✅ CORS configured</li>
                <li>✅ Laravel Sanctum for API authentication</li>
                <li>✅ Password hashing and validation</li>
            </ul>
        </div>
    </div>
</body>
</html> 