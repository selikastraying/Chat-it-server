const fs = require('fs');

exports.getUser = (id, pass) => {
  const fd = fs.readFileSync('users.json');
  const users = JSON.parse(fd);
  const user = users.users.find((userdata) => userdata.id === id);
  if (user) {
    if (pass === user.pass) {
      return true;
    }
  }
  return false;
};

exports.register = (data) => {
  const fd = fs.readFileSync('users.json');
  const users = JSON.parse(fd);
  const user = users.users.find((userdata) => userdata.id === data.id);
  if (!user) {
    users.users.push(JSON.parse(data));
    fs.writeFileSync('users.json', JSON.stringify(users), () => {
      // console.log('The file has been saved!');
    });
    return true;
  }
  return false;
};

exports.getFriends = (id) => {
  const fd = fs.readFileSync(`users/${id}.json`);
  const friends = JSON.stringify(JSON.parse(fd).friends);
  return friends;
};

exports.addFriend = (id, friendid) => {
  const fd = fs.readFileSync(`users/${id}.json`);
  const user = JSON.parse(fd);
  const friend = JSON.parse(`{"id":"${friendid}"}`);
  user.friends.push(friend);
  fs.writeFileSync(`users/${id}.json`, JSON.stringify(user), () => {
    // console.log('The file has been saved!');
  });
  return true;
};

exports.addChat = (id, chatid, chatname) => {
  const fd = fs.readFileSync(`users/${id}.json`);
  const user = JSON.parse(fd);
  const chat = JSON.parse(`{"id":"${chatid}","name":"${chatname}"}`);
  user.chats.push(chat);
  fs.writeFileSync(`users/${id}.json`, JSON.stringify(user), () => {
    // console.log('The file has been saved!');
  });
  return true;
};
