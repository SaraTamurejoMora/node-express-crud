import express from 'express';
import { PORT, SECRET_JWT_KEY} from './config.js';


import { UserRepository } from './user-repository.js';


const app = express();

app.use(express.json());
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views', './views');


//Incio de los endpoints

app.get('/',(req,res) => {
    res.render('register');
})


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    console.log("Nuevo usuario:", username, password);


    res.status(201).json({ message: "Usuario registrado con éxito" });
});



app.post('/register', async (req,res) => {
    const {username,password} = req.body;
    console.log(username);
try{
    const id = await UserRepository.create({username,password})
    res.send({id})
}catch(error){
    res.status(400).send(error.message);
}

    
});

app.listen(PORT,() => console.log(`Abierto en el puerto ${PORT}`))
