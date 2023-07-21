const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const connectDb = require("./config/db_connection");
const dotenv = require("dotenv").config();

connectDb()
const app = express()

const port = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/api/contacts", require("./routes/ContactRoute"))
app.use("/api/products", require("./routes/ProductRoute"))
app.use("/api/users", require("./routes/UserRoute"))
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on the port ${port}`);
})