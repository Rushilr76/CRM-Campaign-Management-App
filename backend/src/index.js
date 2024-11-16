import dotenv from "dotenv"
import connectDB from "./db/index.js"
import app from "./app.js"

dotenv.config({path: "./.env"}) // .env file is under root directory 

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("Some error in connecting DB: ", error)
        throw err
    })

    const port = process.env.PORT || 8000
    app.listen(port, () => {
        console.log("Server is running at port: ", port)
    })
})
.catch((err) => {
    console.log("DB connection failed !! - ", err)
})