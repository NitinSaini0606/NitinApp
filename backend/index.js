const express = require('express');

const app = express();
require('dotenv').config();
require('./Models/db');
const TaskRouter = require('./Router/TaskRouter');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./Router/auth');
app.use(express.json());
app.use(express.urlencoded({extended: true}))
console.log("DB_URL:", process.env.DB_URL);

app.get('/', (req,res) => {
    res.send('Hello World!');
})
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use('/tasks', TaskRouter);
app.use('/auth',auth);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});