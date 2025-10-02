import express from 'express';
import { PORT, SECRET_JWT_KEY} from './config.js';


const app = express();

app.use(express.json());
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views', './views');


//Incio de los endpoints

app.get('/',(req,res) => {
    res.render('login');
})

app.post('/register', (req,res) => {
    const {username,password} = req.body;
    console.log(username);


});

app.listen(PORT,() => console.log(`Abierto en el puerto ${PORT}`))
