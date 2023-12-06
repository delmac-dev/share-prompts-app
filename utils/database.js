import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async()=> {
    mongoose.set('strictQuery')
    if(isConnected){
        console.log("MongoDB is already connected");
        return;
    }
    
    try {
        await mongoose.connect('mongodb+srv://delmac:liRHS2OgbtroSDkF@promptopia.nlqbyk6.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp', {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected =true
    } catch (error) {
        console.log(error)
    }
}