const users = [];

// user zum chat hinzufügen
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// aktuellen user 
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// hat den chat verlassen
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// aktive user
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};
