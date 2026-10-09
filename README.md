# COMP3123 Exercise 05

**Student:** Felipe da Rocha Vieira Mattos  
**Student ID:** 101581203

## Run locally

```bash
npm install
npm start
```

Server: `http://localhost:8081`

## Routes

- `GET /home`
- `GET /api/v1/user/profile`
- `POST /api/v1/user/login`
- `GET /api/v1/user/logout/:username`

### Valid login body

```json
{
  "username": "bret",
  "password": "bret@123"
}
```

### Expected responses

Valid:
```json
{"status":true,"message":"User Is valid"}
```

Invalid username:
```json
{"status":false,"message":"User Name is invalid"}
```

Invalid password:
```json
{"status":false,"message":"Password is invalid"}
```

## Short Answers

### Purpose of express.Router()

`express.Router()` creates a modular, mountable route handler. It keeps related routes in separate files, improving organization and maintainability. In this project, profile, login, and logout routes are grouped in `routes/users.js` and mounted at `/api/v1/user`.

### Error handling in Express

Unexpected errors are forwarded with `next(err)` to centralized error-handling middleware:

```javascript
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});
```

### Dynamic port binding

`app.listen(process.env.port || 8081)` uses the environment-provided port when available and otherwise uses port 8081. This is useful on hosting platforms that assign ports dynamically.
