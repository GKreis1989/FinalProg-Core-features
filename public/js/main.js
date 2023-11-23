const $id = (id) => document.getElementById(id);
const $class = (className) => document.getElementsByClassName(className);
const $tag = (tagName) => document.getElementsByTagName(tagName);

const checkAuth = async () => {
    try {
        const auth = await fetch('/auth/check');
        return auth;
    } catch(e) {
        console.log(e);
        return { status: 500 };
    }
}