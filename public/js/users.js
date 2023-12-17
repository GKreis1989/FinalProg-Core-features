const userList = $id('user-list');
const userFilter = $id('user-filter');
const patientFilter = $id('patient-filter');

const selectUser = (event) => {
    console.log(window.localStorage);
    window.localStorage['currentUser'] = event.target.id;
    window.location = 'individualUser.html';
}

const createUser = ({
    emailAddress,
    _id,
    firstName,
    lastName,
    role
}) => {
    const li = document.createElement('li');
    li.classList.add('user-element');
    const button = document.createElement('button');
    button.id = _id;
    button.classList.add('select-user');
    button.innerText = `${emailAddress} - ${firstName} ${lastName} - ${role}`;
    button.addEventListener('click', selectUser)
    li.appendChild(button);
    return li;
}

const getUsers = async (doFilter = (a) => a) => {
    const response = await fetch('/user');
    userList.innerHTML = '';
    const users = await response.json();
    const userElements = users.filter(doFilter).map(createUser)
    userElements.forEach(u => userList.appendChild(u))
}

userFilter.addEventListener('click', () => {
    getUsers();
});

patientFilter.addEventListener('click', () => {
    getUsers((user) => user.role == 'patient')
})

getUsers();