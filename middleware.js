import * as helpers from './helpers.js';

export const ROOT = async (req, res, next) => {
    const date = new Date();
    console.log(`${date.toISOString()} ${req.method} ${req.originalUrl}`)
    if(['/index.html', '/auth.html', '/user/login', '/user'].includes(req.originalUrl)
    || req.originalUrl.endsWith(".css") || req.originalUrl.endsWith(".js")) {
        return next();
    }
    try {
        helpers.authenticateUser(req);
    } catch(error) {
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