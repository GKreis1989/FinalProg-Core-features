document.addEventListener('DOMContentLoaded', async () => {
    const userId = window.location.pathname.split('/').pop();
    const individualUser = document.getElementById('individualUser');

    try {
        const response = await fetch(`/user/${userId}`);
        const user = await response.json();

        const listItem = document.createElement('li');
        listItem.textContent = `${user.firstName} ${user.lastName} - ${user.emailAddress}`;
        individualUser.appendChild(listItem);
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
});
