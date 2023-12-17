import * as helpers from './helpers.js';

export const ROOT = async (req, res, next) => {
    if(['/index.html', '/auth.html'].includes(req.originalUrl)
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