# JSON Server with JWT Authentication

A simple JSON server with JWT authentication and refresh token support. This server is implemented using json-server.

## Prerequisites

- [Node.js](https://nodejs.org/en/) >= 14.x
- [npm](https://www.npmjs.com/) >= 6.x

## Installation

1. Clone the repository:

  ```git clone https://github.com/GagikNav/prod-todo-app.git```

  `cd prod-todo-app`

  `cd json-server-test`

1. Install dependencies:

`npm install`

## Usage

1. Start the server:

`npm start`

<font size="1">The server will be running on [http://localhost:4545](http://localhost:4545).</font>

2. Authenticate with the server:

    Send a POST request to `/auth/login` with the following JSON body:
    ```json
      {
        "username": "admin",
        "password": "password"
      }
      ```

      <font size="1">The server will respond with an access token.</font>

3. Access protected routes:
    Use the access token obtained in the previous step to send requests to protected routes. Add the `Authorization` header with the value `Bearer <access_token>` to your requests.

4. Refresh the access token:
    When the access token expires, send a POST request to /auth/refresh to obtain a new access token. The server will use the refresh token stored as an HTTP-only cookie to authenticate the request and generate a new access token.

5. Perform CRUD operations for todos:
   - **Create**: Send a POST request to /todos with a JSON body containing the todo data. Example:
  
      ```json
      {
        "title": "Buy groceries",
        "completed": false
      }
      ```

    - **Read**: Send a GET request to `/todos ` to retrieve all todos, or `/todos/:id` to retrieve a specific todo by its ID.
    - **Update**: Send a PUT or PATCH   request to /todos/:id with a JSON body containing the updated todo data. Example:
      
      ```json
      {
        "title": "Buy groceries",
        "completed": true
      }
      ```

    - **Delete**: Send a DELETE request to /todos/:id to delete a specific todo by its ID.

## Customization

This server uses a simple hardcoded username and password for demonstration purposes. In a real-world application, replace the login logic with a proper user validation system, such as looking up the user in a database and checking their hashed password.

Modify the `SECRET_KEY` variable in the `server.js` file to use your own secret key for signing JWT tokens.

**These instructions cover how to perform create, read, update, and delete operations on todos. Users can follow these steps to interact with the todo resources using an HTTP client or programming language of their choice.**

