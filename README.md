# MelodyVerse

**MelodyVerse** is a music platform where users can sign up, log in, explore new music, follow artists, create playlists, and more. It features a React frontend and a Node.js backend with MongoDB as the database.

## Features

-   **User Authentication**: JWT-based sign up and login.
-   **User Session Management**: Secure session handling with JWT.
-   **Redirection**:
    -   If a JWT token is stored (i.e., the user is already logged in), the `/login` and `/signup` routes automatically redirect to the `/home` .
    -   If the user is not logged in, accessing `/home` will redirect to the login page.

## Tech Stack

-   **Frontend**: React, Axios, CSS

-   **Backend**: Node.js, Express, MongoDB

-   **Security**: JWT, bcryptjs, express-validator

## Backend Routes

-   **POST** `/signUp`: User registration, returns JWT.

-   **POST** `/login`: User authentication, returns JWT.

-   **GET** `/validateToken`: Validate user JWT.

## Frontend Features

-   **Sign Up / Log In**: Users can sign up and log in, with JWT saved in `localStorage`.

-   **Home Page**: Explore music, playlists, follow artists.

-   **Logout**: Ends session and redirects to login.

## Setup

### Prerequisites

-   Node.js, npm, MongoDB

### Installation

1\. **Clone the Repository**:

```bash

git clone https://github.com/miranas11/melodyverse.git

cd melodyverse

```

2\. **Backend**:

```bash

cd backend

npm install

node server.js

```

3\. **Frontend**:

```bash

cd frontend

npm install

npm start

```

4\. **Visit**: `http://localhost:3001/login` to access the app.

## Security

-   **JWT Authentication**: Tokens validated for secure routes.
