const express = require('express');
const cors = require('cors');
const users = require('./modules/users');
const chats = require('./modules/chats');
const tokens = require('./modules/tokens');
const time = require('./modules/time');

const app = express();

app.use(cors());

app.get('/login', (req, res) => {
  if (users.getUser(req.query.id, req.query.pass)) {
    res.end(tokens.getToken(req.query.id));
  } else res.status(500).send({ error: 'Something failed!' });
});

app.get('/register', (req, res) => {
  if (users.register(req.query.data)) res.end(tokens.getToken(req.query.data.id));
  else res.status(500).send({ error: 'Something failed!' });
});

app.get('/checkToken', (req, res) => {
  res.end(tokens.checkToken(req.query.token).id);
});

app.get('/getFriends', (req, res) => {
  res.end(users.getFriends(tokens.checkToken(req.query.token).id));
});

app.get('/getChats', (req, res) => {
  res.end(chats.getChats(tokens.checkToken(req.query.token).id));
});

app.get('/getChat', (req, res) => {
  res.end(chats.getChat(req.query.chatid));
});

app.get('/addMember', (req, res) => {
  chats.addMember(req.query.chatid, req.query.member);
  req.query.member.forEach((m) => {
    users.addChat(m, req.query.chatid, req.query.chatname);
  });
  res.end();
});

app.get('/sentChat', (req, res) => {
  if (chats.sentChat(tokens.checkToken(req.query.token).id,
    req.query.chatid,
    req.query.newchat,
    time.getTime())) res.end();
  else res.status(500).send({ error: 'Something failed!' });
});

app.get('/createChat', (req, res) => {
  const { id } = tokens.checkToken(req.query.token);
  const chatid = chats.createChat(id, req.query.member, req.query.newchat, time.getTime());
  req.query.member.forEach((m) => {
    let { chatname } = req.query;
    if (chatname === '') { chatname = req.query.member.filter((self) => self !== m).join('"'); }
    users.addChat(m, chatid, chatname);
  });
  let { chatname } = req.query;
  if (chatname === '') { chatname = req.query.member.filter((m) => m !== id).join('"'); }
  users.addChat(id, chatid, chatname);
  const chat = JSON.stringify({ id: chatid, name: chatname });
  res.end(chat);
});

app.listen(3000);
