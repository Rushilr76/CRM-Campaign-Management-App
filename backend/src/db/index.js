import mongoose from "mongoose"
import {db_name} from "../constants.js"

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/${db_name}`)
        console.log("MongoDB connected!!")
        
    } catch(error) {
        console.log("ERROR in connecting MongoDB!! ", error)
        process.exit(1)
    }
}

export default connectDB