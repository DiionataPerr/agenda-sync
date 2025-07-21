const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const users = [];
const events = [];

// Middleware de autenticação
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch {
    res.sendStatus(403);
  }
}

// Cadastro de usuários
app.post('/auth/signup', (req, res) => {
  const { email, password, role } = req.body;
  if (users.find(u => u.email === email)) return res.status(409).send('Usuário já existe');
  const user = { id: users.length + 1, email, password, role: role || 'user' };
  users.push(user);
  res.status(201).send({ id: user.id });
});

// Login
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.sendStatus(401);
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  res.send({ token });
});

// Criar evento
app.post('/events', authenticate, (req, res) => {
  const event = { id: events.length + 1, userId: req.user.id, ...req.body };
  events.push(event);
  res.status(201).send(event);
});

// Listar eventos
app.get('/events', authenticate, (req, res) => {
  const userEvents = events.filter(e => e.userId === req.user.id || req.user.role === 'master');
  res.send(userEvents);
});

// Receber evento do Google Calendar (via Make)
app.post('/import', (req, res) => {
  console.log('Evento recebido do Google:', req.body);
  res.status(200).send('Importado com sucesso');
});

// Enviar evento para o Make (criado na plataforma)
app.post('/webhook', (req, res) => {
  console.log('Evento criado na plataforma, enviar ao Make:', req.body);
  res.status(200).send('Webhook recebido');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
