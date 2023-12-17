import * as helpers from './helpers.js';

export const ROOT = async (req, res, next) => {
    const date = new Date();
    let user;
    try {
        user = helpers.authenticateUser(req);
    } catch(err) {
        user = { emailAddress: 'unauthenticated' }
    }
    console.log(`${date.toUTCString()} ${req.method} ${req.originalUrl} ${user.emailAddress}`)
    if(['/index.html', '/auth.html', '/user/login', '/user'].includes(req.originalUrl)
    || req.originalUrl.endsWith(".css") || req.originalUrl.endsWith(".js")) {
        return next();
    }
    if(user.emailAddress == 'unauthenticated') {
        if(req.method == 'GET') {
            if(['/index.html', '/auth.html'].includes(req.originalUrl)
            || req.originalUrl.endsWith(".css") || req.originalUrl.endsWith(".js"))
                return next();
        }
        else if(req.method == 'POST') {
            if(['/user/login', '/user'].includes(req.originalUrl)) return next();
        }
        return res.redirect('/auth.html');
    }
    next();
}

export const AUTH = async (req, res, next) => {
    try {
        helpers.authenticateUser(req);
    } catch(error) {
        return next();
    }
    res.redirect('/home.html');
}