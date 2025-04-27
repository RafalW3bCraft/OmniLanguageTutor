# App Launch Instructions for Windows Users

This project is a full-stack application with a React client and an Express server using TypeScript.

## Prerequisites

- Node.js (version 18 or later recommended)
- npm (comes with Node.js)
- PostgreSQL database running and accessible
- Environment variables for database and OpenAI API key

## Setup

1. Clone the repository and navigate to the project root directory.

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following content (replace values as needed):

```
DATABASE_URL=postgresql://username:password@localhost:5432/yourdbname
OPENAI_API_KEY=your_openai_api_key_here
```

Make sure your PostgreSQL database is running and accessible with the provided connection string.

## Running the App in Development

The app uses a single command to run both the server and client in development mode.

Run the following command in the project root directory:

```bash
npm run dev
```

This will:

- Start the Express server on port 5000
- Serve the React client app via Vite middleware
- Apply database migrations and initialize data

## Notes

- Ensure the environment variables are correctly set before running the app.
- The server listens on port 5000 and serves both API and client.
- If you encounter errors related to environment variables, verify your `.env` file and restart the terminal or IDE.
- For database connection issues, ensure PostgreSQL is running and the connection string is correct.

## Building for Production

To build the client and server for production, run:

```bash
npm run build
```

To start the production server after building, run:

```bash
npm start
```

## Troubleshooting

- If you see errors about missing environment variables, double-check your `.env` file.
- For database connection refused errors, verify your database server is running and accessible.
- For OpenAI API errors, ensure your API key is valid and has the necessary permissions.

---

If you need further assistance, please provide error messages or logs for support.
