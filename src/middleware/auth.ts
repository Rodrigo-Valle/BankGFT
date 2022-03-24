import { Request, Response, Next } from 'express'
import * as jwt from 'jsonwebtoken'


export const auth = async (req: Request, res: Response, next: Next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'tokenbank');
        req.id = decoded.id;

        next();
    } catch (error) {
        res.status(401).send("Por favor, autentique-se")
    }
}