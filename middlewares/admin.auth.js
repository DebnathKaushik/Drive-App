const jwt = require("jsonwebtoken");

const verifyRole = (requiredRole) => {
    return (req, res, next) => {
        const token = req.cookies.token;
        if (!token) return res.status(401).send("Token missing");

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            if (decoded.role !== requiredRole) {
                return res.status(403).send(`Access denied: ${requiredRole} only`);
            }

            next();  // else next()
        } catch (err) {
            return res.status(401).send("Invalid token");
        }
    };
};

module.exports = verifyRole ;
