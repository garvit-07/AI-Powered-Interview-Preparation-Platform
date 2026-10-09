const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

/* global error handling middleware - always send JSON, never HTML */
app.use((err, req, res, next) => {
    console.error("Global express error:", err)
    res.status(err.status || 500).json({
        message: err.message || "Internal server error"
    })
})

module.exports = app