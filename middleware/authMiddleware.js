// Middleware to check if the user is an admin
exports.isAdmin = (req, res, next) => {
    console.log(req.user)
    if (req.user && req.user.role === 'admin') {
        next(); // User is admin, proceed to the next middleware
    } else {
         return res.status(401).json({ msg: 'Access denied' });
    }
};
