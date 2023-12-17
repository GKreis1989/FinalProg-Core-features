const $id = (id) => document.getElementById(id);
const $class = (className) => document.getElementsByClassName(className);
const $tag = (tagName) => document.getElementsByTagName(tagName);
const errorMessage = $id('error-message');
const error = (err) => {
    errorMessage.innerText = err;
    errorMessage.classList.remove('hidden');
    setTimeout(() => {
        errorMessage.classList.add('hidden');
        errorMessage.innerText = '';
    }, 3500);
}