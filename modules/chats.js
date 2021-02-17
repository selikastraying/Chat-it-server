const fs = require('fs');

exports.getChats = (id) => {
  const fd = fs.readFileSync(`users/${id}.json`);
  return JSON.stringify(JSON.parse(fd).chats);
};

exports.getChat = (chatid) => {
  const fd = fs.readFileSync(`chats/${chatid}.json`);
  return fd;
};

exports.getChatMember = (chatid) => {
  const fd = fs.readFileSync(`chats/${chatid}.json`);
  const { member } = JSON.parse(fd);
  return member;
};

exports.addMember = (chatid, member) => {
  const fd = fs.readFileSync(`chats/${chatid}.json`);
  const chat = JSON.parse(fd);
  member.forEach((m) => {
    chat.member.push(m);
  });
  fs.writeFileSync(`chats/${chatid}.json`, JSON.stringify(chat), () => {
    // console.log('The file has been saved!');
  });
  return true;
};

exports.sentChat = (id, chatid, newchat, time) => {
  const fd = fs.readFileSync(`chats/${chatid}.json`);
  const chat = JSON.parse(fd);
  chat.chat.push(JSON.parse(`{"id":${chat.chat[chat.chat.length - 1].id + 1},"who":"${id}","what":"${newchat}","when":${time}}`));
  fs.writeFileSync(`chats/${chatid}.json`, JSON.stringify(chat), () => {
    // console.log('The file has been saved!');
  });
  return true;
};

exports.createChat = (id, member, newchat, time) => {
  const chatid = id + time;
  const memberString = member.join('"');
  const chat = `{"member":["${id}","${memberString}"],"chat":[{"id":1,"who":"${id}","what":"${newchat}"}]}`;
  fs.writeFileSync(`chats/${chatid}.json`, chat, () => {
    // console.log('The file has been saved!');
  });
  return chatid;
};
