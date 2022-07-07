const express = require('express');

require('../src/database');

const app = express();

app.use(express.json());

const PORT = 3001;
app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`);
})