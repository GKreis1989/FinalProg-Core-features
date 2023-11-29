const userList = $('userList');

const users = undefined; // TODO: make call to server for users (maybe using fetch?)

users.forEach(user => {
    userList.appendChild(`<li>${user.name}</li>`);
});