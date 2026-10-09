const mongoose = require("mongoose")

async function connectToDB() {
    const mongoUri = process.env.MONGO_URI || process.env.MONGO_URL

    try {
        if (!mongoUri || mongoUri.includes("cluster0.cmndjw9.mongodb.net")) {
            throw new Error("Default YouTube template MongoDB URL is inactive/unreachable")
        }
        await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 4000 })
        console.log("Connected to Database (MongoDB Atlas)")
    } catch (err) {
        console.warn("MongoDB Atlas Connection Note:", err.message)
        console.log("Starting automatic in-memory MongoDB database fallback...")
        try {
            const { MongoMemoryServer } = require("mongodb-memory-server")
            const mongoServer = await MongoMemoryServer.create()
            const memoryUri = mongoServer.getUri()
            await mongoose.connect(memoryUri)
            console.log("Connected to Database (In-Memory MongoDB Active)")
        } catch (memErr) {
            console.error("Database Connection Failed Completely:", memErr.message)
        }
    }
}

module.exports = connectToDB