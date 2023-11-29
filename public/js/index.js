const enterButton = $id('enterButton');

const main = async () => {

    const isLoggedIn = (await checkAuth()).status === 200;
    window.location.href = isLoggedIn ? '/home.html' : '/auth.html';

}

enterButton.addEventListener('click', main);