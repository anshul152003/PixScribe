import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


const userAuth = async (req, res, next) => {
    try {
        // Extract token from the Authorization header (Bearer <token>)
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("Authorization header missing or malformed");
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
        }

        const token = authHeader.split(" ")[1];
        console.log("Token extracted: ", token); // Debugging line

        // Verify the token using the JWT_SECRET
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in environment variables");
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token: ", decoded); // Debugging line

        if (decoded.id) {
            req.body.userId = decoded.id; // Attach the user ID to the request body
            next(); // Proceed to the next middleware or route handler
        } else {
            console.log("Token does not contain a valid user ID");
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
        }
    } catch (error) {
        console.error("Error verifying token: ", error.message);
        res.status(401).json({ success: false, message: "Invalid or Expired Token" });
    }
};

export default userAuth;
