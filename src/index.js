import express from 'express';
import userRouter from './routes/userRouter.js';
import coinRouter from './routes/coinsRouter.js';
import multer from 'multer';
import '../src/mongodb/db.js'

const app = express();

app.use(express.json());
app.use(multer().any())


app.use('/user',userRouter);
app.use('/coins',coinRouter)


const PORT = 5000;

app.listen(PORT, () => {
    console.log("Server running on PORT 5000")
})
