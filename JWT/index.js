import express from 'express';
import { PORT, SECRET_JWT_KEY} from './config.js';

import {name} from 'ejs';
import { UserRepository } from './user-repository.js';

//creo el express
const app = express();

//configuro
app.use(express.json());
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views', './views');


//Incio de los endpoints


app.get('/',(req,res) => {
    //renderiza de la carpeta view la página de register
    res.render('register');
})


app.post('/login', (req, res) => {
    //del cuerpo de la request recibe un user y un password
    const { username, password } = req.body;

    //Si no recibe un usuario o contraseña, envia error
    if (!username || !password) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    console.log("Nuevo usuario:", username, password);


    res.status(201).json({ message: "Usuario registrado con éxito" });
});



app.post('/register', async (req,res) => {
    const {username,password} = req.body;
    console.log(req.method);
try{
    const id = await UserRepository.create({username,password})
    res.send({id})
}catch(error){
    res.status(400).send(error.message);
}

    
});

app.listen(PORT,() => console.log(`Abierto en el puerto ${PORT}`))
