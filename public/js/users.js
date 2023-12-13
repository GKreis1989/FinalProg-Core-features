document.addEventListener('DOMContentLoaded', async () => {
    const userList = document.getElementById('userList');
    
    try {
        const response = await fetch('/user/all');
        const users = await response.json();

        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `<a href="/individualUser.html?userId=${user._id}">${user.firstName} ${user.lastName} - ${user.emailAddress}</a>`;
            userList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
});
