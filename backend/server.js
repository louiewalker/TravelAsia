const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const eventRoutes= require("./routes/eventRoutes")
const travelRoutes= require("./routes/travelRoutes")
const productRoutes= require("./routes/productRoutes")
const cartRoutes= require('./routes/cartRoutes')
const blogRoutes= require('./routes/blogRoutes')


const app = express();

require('dotenv').config()



app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'public')));




mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use("/api/user", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/travels", travelRoutes);
app.use("/api/products", productRoutes);

app.use("/api/blogs", blogRoutes);
app.use("/api/cart", cartRoutes);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
