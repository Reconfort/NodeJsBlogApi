const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require('dotenv')
const mongoose =  require('mongoose')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/categories')
const multer = require('multer')

dotenv.config();
app.use(express.json());
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex: true,
})
.then(console.log("Connected to Mongo DB"))
.catch((err) => console.log(err))

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null,"images");
    },
    filename(req, file, cb){
        cb(null,"hello.png")
        // cb(null, req.body.name)
        
    }
})

const upload = multer({storage:storage});
app.post("/api/upload/", upload.single("file"), (req, res)=>{
    res.status(200).json("File uploaded 🖲")
})

app.use("/api/auth/", authRoute)
app.use("/api/users/", userRoute)
app.use("/api/posts/", postRoute)
app.use("/api/categories/", categoryRoute)

app.listen(port,()=>{
    console.log(`Backend is running on http://localhost/${port} 🚀🚀`)
})