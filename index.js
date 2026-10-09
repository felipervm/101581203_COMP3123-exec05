const express = require('express');
const path = require('path');

const app = express();
const userRouter = require('./routes/users');

const PORT = process.env.PORT || process.env.port || 8081;

app.use(express.json());
app.use('/api/v1/user', userRouter);

app.get('/home', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'home.html'), (err) => {
    if (err) next(err);
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: 'Route not found'
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});

app.listen(PORT, () => {
  console.log(`Web Server is listening at port ${PORT}`);
});
