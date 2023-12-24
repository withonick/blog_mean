const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require("jsonwebtoken");

// w
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const corsOptions = {
    origin: ['http://127.0.0.1:4200', 'http://localhost:4200'],
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

const blogRoute = require('./routes/blogRoute');
const authRoute = require('./routes/authRoute');

const authMiddleWare = (req, res, next) => {
    const secretKey = process.env.SECRET_KEY;
    const token = req.header('Authorization') || '';
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    const decode = jwt.decode(token, secretKey);
    console.log(decode);
    if (!decode) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    req.user = decode;
    next();
};

const errorMiddleware = (err, req, res, next) => {
	res.status(err.status).json({ error: true, message: err.message });
};

app.use('/blogs', authMiddleWare, blogRoute);
app.use('/user', authRoute);
app.use(errorMiddleware);


mongoose.connect('mongodb+srv://withonick:tajimurat@cluster0.iljugf4.mongodb.net/mean_blog?retryWrites=true&w=majority').then(()=> {
    app.listen(PORT, () => {
        console.log(`Express server is running in port ${PORT}`);
    })
}).catch((err) => {
    console.log(`Error while connecting to DB`, err);
});
