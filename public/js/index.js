const enterButton = $id('enterButton');

const main = async () => {

    const isLoggedIn = (await checkAuth()).status === 200; // TODO: check auth status on backend, redirect as necessary
    window.location.href = isLoggedIn ? '/home.html' : '/auth.html';

}

enterButton.addEventListener('click', main);