const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mango= require(`./config/mongo`)
PORT= process.env.PORT;

mango();

const app = express();
app.use(express.json())
// app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin:'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization','Cache-Control', 'Expires','Pragma']
}))

app.get('/', (req, res) => {
  res.send('Backend is running');
});



app.use(`/logtype`,require(`./routes/auth`))
app.use(`/tasktype`,require(`./routes/books`))
app.use(`/carttype`,require(`./routes/cart`))
app.use(`/retype`,require(`./routes/review`))
app.use(`/salestype`,require(`./routes/sales`))

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
  });
