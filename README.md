# Remind Me Later API

## Project Overview

"Remind Me Later" is a RESTful API service built with Node.js and Express that allows users to create and manage reminders through both email and SMS channels. The application uses a MongoDB database to store reminder information and provides a clean, well-structured API for reminder management.

## Key Features

- **Reminder Creation**: Set up reminders with date, time, message and delivery method
- **Reminder Retrieval**: Get upcoming reminders after a specified date and time
- **Flexible Notification Channels**: Choose between email or SMS for receiving reminders
- **Input Validation**: Robust validation for date formats and required fields
- **Error Handling**: Comprehensive error handling with descriptive messages
- **RESTful API Design**: Clean and intuitive API endpoints following REST principles

## Technical Architecture

### Technology Stack

- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB using Mongoose ODM
- **Authentication**: None (API is public for demonstration purposes)
- **Deployment**: Configurable for any environment through environment variables

### Project Structure

```
project-root/
├── controllers/             # Request handlers
│   └── reminder.controller.js
├── db/                      # Database connection and configuration
│   └── index.js
├── models/                  # Mongoose data models
│   └── reminder.model.js
├── routes/                  # API route definitions
│   └── reminder.route.js
├── utils/                   # Utility functions and classes
│   ├── ApiError.js          # Custom error handling
│   ├── ApiResponse.js       # Standardized API responses
│   └── asynchandler.js      # Async request handler wrapper
├── .env                     # Environment variables
├── app.js                   # Express application configuration
├── constants.js             # Application constants
├── index.js                 # Application entry point
└── package.json             # Project dependencies
```

## API Documentation

### Base URL

```
http://localhost:8080/api/v1
```

### Endpoints

#### Create a Reminder
```
POST /reminder
```

**Request Body:**
```json
{
  "date": "2023-05-25",     // YYYY-MM-DD format
  "time": "14:30",          // HH:MM format (24-hour)
  "message": "Buy groceries after work",
  "reminderType": "email"   // "email" or "sms"
}
```

**Successful Response:**
```json
{
  "message": "reminder created successfully",
  "data": {
    "_id": "65f8d1c2e4a3b721a4f82c1d",
    "date": "2023-05-22T14:30:00.000Z",  // Stored as Date object
    "message": "Buy groceries after work",
    "reminderType": "email",
    "createdAt": "2023-05-22T10:23:45.123Z",
    "updatedAt": "2023-05-22T10:23:45.123Z"
  },
  "success": true
}
```

#### Get Upcoming Reminders
```
GET /reminder/:date/:time
```

**URL Parameters:**
- `date`: Date in YYYY-MM-DD format (e.g., "2023-05-25")
- `time`: Time in HH:MM format (24-hour) (e.g., "14:30")

**Request Body:** None required

**Successful Response:**
```json
{
  "message": "reminders fetched successfully",
  "data": [
    {
      "_id": "65f8d1c2e4a3b721a4f82c1d",
      "date": "2023-05-26T14:30:00.000Z",
      "message": "Buy groceries after work",
      "reminderType": "email",
      "createdAt": "2023-05-22T10:23:45.123Z",
      "updatedAt": "2023-05-22T10:23:45.123Z"
    },
    {
      "_id": "65f8d1c2e4a3b721a4f82c1e",
      "date": "2023-05-27T09:00:00.000Z",
      "message": "Doctor appointment",
      "reminderType": "sms",
      "createdAt": "2023-05-22T11:45:12.456Z",
      "updatedAt": "2023-05-22T11:45:12.456Z"
    }
  ],
  "success": true
}
```

## Data Model

### Reminder Schema

| Field        | Type     | Description                       | Constraints                   |
|--------------|----------|-----------------------------------|-------------------------------|
| date         | Date     | Date and time for the reminder    | Required                      |
| message      | String   | Content of the reminder           | Required                      |
| reminderType | String   | Method of delivery                | Required, enum: [email, sms]  |
| createdAt    | Date     | Timestamp when reminder was created | Auto-generated              |
| updatedAt    | Date     | Timestamp of last update          | Auto-generated                |

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- MongoDB instance (local or Atlas)
- npm or yarn package manager

### Installation Steps

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd Symplique_Solutions
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create .env file in the root directory with the following variables
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>
   PORT=8080
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. The API will be available at http://localhost:8080

## Error Handling

The API uses a consistent error response format:

```json
{
  "success": false,
  "message": "Error message describing what went wrong",
  "errors": [],
  "data": null,
  "statusCode": 400
}
```

Common error codes:
- 400: Bad Request (invalid input)
- 404: Resource Not Found
- 500: Server Error

## Code Design Patterns

### Async Handler Pattern
The application uses a custom async handler pattern that wraps route handlers to catch and process Promise rejections, eliminating the need for try/catch blocks in every controller.

### Repository Pattern
The application follows a simplified repository pattern with clear separation between controllers, models, and routes.

### API Response Standardization
All API responses follow a consistent format using the ApiResponse utility class.

## Developer

This project was developed by Mayank Sharma as part of the Symplique Solutions internship application process.

## License

ISC License