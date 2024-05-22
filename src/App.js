import dotenv from 'dotenv'
dotenv.config()
import express from 'express'//importo e armazeno
import User from './Modles/Users.js'
const app = express() //crio uma variável chamada app que recebe o que importei acima

import db from './db.js';
import hashPassword from './middlewares/hashPassord.js';
import { generateToken, authenticateToken } from './middlewares/authService.js';
import bcrypt from 'bcrypt';


app.use(express.json())

db.sync();

app.get('/', (req, res) => {
    res.send("olá mundo")
})

app.post('/register', hashPassword, async (req, res) => {
    try {
        const user = await User.create({ ...req.body });
        res.send(user);
    } catch (error) {
        res.status(500).send(error)
    }

});

app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }
    const passwordMatch = bcrypt.compareSync(senha, user.senha);
    if (!passwordMatch) {
      return res.status(401).send('Invalid email or password');
    }
    const token = generateToken(user.dataValues);
    delete user.dataValues.senha;
    res.send({ user, token });
  });

  app.get('/users', authenticateToken, async (req, res)=>{
  
    const users = await User.findAll();
    res.send(users)
  })

app.listen(3000, () => console.log("Api Rodando")) // está escutando na porta 3000 () => console.log() —--- é uma função de callback