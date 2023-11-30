const mysql = require('mysql');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // Adicionando o middleware para analisar JSON no corpo da requisição

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Wi@20081998',
  database: 'tarefas',
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    throw err;
  }
  console.log('Conectado ao MySQL!');

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
});

app.get('/tarefas', (req, res) => {
  connection.query('SELECT * FROM tarefas', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
app.delete('/tarefas/:id', (req, res) => {
    const taskId = req.params.id;
  
    const query = 'DELETE FROM tarefas WHERE id = ?';
    connection.query(query, [taskId], (err, results) => {
      if (err) throw err;
      res.send('Tarefa excluída com sucesso');
    });
  });
  
app.post('/tarefas', (req, res) => {
  const { descricao, data_entrega } = req.body;
  const query = 'INSERT INTO tarefas (descricao, data_entrega) VALUES (?, ?)';
  connection.query(query, [descricao, data_entrega], (err, results) => {
    if (err) throw err;
    res.send('Tarefa adicionada com sucesso');
  });
});
