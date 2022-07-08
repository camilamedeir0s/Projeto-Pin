const express = require('express');
const router = require('./routes/index');
require('../src/database');
const app = express();

app.use(express.json());
app.use(router);

const PORT = 8080;
app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`);
})