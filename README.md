# Task Management Application

## Overview

This project is a Task Management Application that allows users to manage tasks efficiently. It includes features for user authentication, task creation, editing, and deletion, as well as a dashboard for task management.

## Features

- **User Authentication:**
  - Users can log in using their Google accounts.

- **Homepage:**
  - A modern and informative homepage showcasing the features and benefits of the application.

- **Dashboard:**
  - Allows users to view, create, edit, and delete tasks.
  - Provides a user-friendly interface for managing tasks efficiently.

- **Task Details:**
  - Each task includes:
    - Title
    - Description
    - Due Date
  - Users can modify any aspect of a task, including updating the due date using a calendar for ease of use.

- **Data Persistence:**
  - User login credentials are cached to track session and maintain authentication state.

## Technologies Used

- **Frontend:**
  - React.js
  - Framer Motion (for animations)
  - Next.js (for server-side rendering and routing)
  - Tailwind CSS (for styling)

- **Backend:**
  - Next.js API routes for server-side logic
  - SWR (for data fetching)
  - NextAuth.js (for authentication with Google)

- **Database:**
  - TBD (Specify your database choice here, if applicable)

## Setup Instructions

To run this project locally, follow these steps:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
