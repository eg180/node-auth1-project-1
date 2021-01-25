module.exports = function(req, res, next) {
    // server maintains sessions list/array
    // with obj that represent stored sessions
    // (clients that authed successfuly)

    if (req.session && req.session.user) {
        next()
    } else {
        res.status(401).json('You shall not pass.')
    }
}