import mongoose from "mongoose";


export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!);

        const connection = mongoose.connection;

        connection.on('connected', ()=> {
            console.log("DB connected");
        })

        connection.on('error', (err)=>{
            console.log("Make sure mongoDb is running" + err);
            process.exit();
        })

    } catch (error) {
        console.log("Something went wrong while conneecting with the database")
        console.log(error);
    }
}