import express from 'express';
import cors from 'cors';
import multer from 'multer';
import mongoose from 'mongoose';
import { registerValidation,loginValidation,todoCreateValidation } from './validations/auth.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';

import { TodoController, UserController } from './controllers/index.js'



mongoose
    .connect('mongodb+srv://shukur:wwwwwww@cluster0.8ithriu.mongodb.net/todoPR?retryWrites=true&w=majority')
    .then( () => console.log('DB Ok'))
    .catch( (err) => console.log('DB error',err));

const PORT = process.env.PORT || 3000;
const app = express();

const storage = multer.diskStorage(
    {
        distination:  ( _, __, cb) => {
            cb(null,'uploads')
        },
        distination: ( _, file, cb) => {
            cb(null, file.originalname)
        }
    }
)

const upload = multer({ storage });

//wwwwwww
app.use(cors())
app.use(express.json())
app.use('/uploads',express.static('uploads'))

app.post('/auth/login',loginValidation,handleValidationErrors,UserController.login)
app.post('/auth/register',registerValidation,handleValidationErrors,UserController.register)
app.get('/auth/me',checkAuth,UserController.getMe)

app.post('/upload',checkAuth, upload.single('image'), (req,res)=>{
    res.json({
        url:`/uploads/${req.file.originalname}`,
    })
})

app.get('/todos',checkAuth,TodoController.getAll)
app.get('/todos/:id',checkAuth,TodoController.getOne)
app.post('/todos',checkAuth,todoCreateValidation,handleValidationErrors,TodoController.create)
app.delete('/todos/:id',checkAuth,TodoController.remove)
app.patch('/todos/:id',checkAuth,todoCreateValidation,handleValidationErrors,TodoController.update)

app.listen(PORT,(err) => {
    if(err){
        return err
    }
    console.log("server is running")
})