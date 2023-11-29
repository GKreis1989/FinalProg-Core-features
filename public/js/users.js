document.addEventListener('DOMContentLoaded', async () => {
    const userList = document.getElementById('userList');
    
    try {
        const response = await fetch('/user/all');
        const users = await response.json();

        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `${user.firstName} ${user.lastName} - ${user.emailAddress}`;
            userList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
});
