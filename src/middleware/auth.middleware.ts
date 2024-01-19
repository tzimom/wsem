import jsonwebtoken from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { pool } from '../services/database.service';
import { RowDataPacket } from 'mysql2';
import authConfig from '../configs/auth.config';

export type AuthPayload = { username: string };
export type AuthRequest = Request & { [k in keyof AuthPayload]?: AuthPayload[k] };

export async function authenticateToken(request: AuthRequest, response: Response, next: NextFunction) {
    const tokenCookie: string = request.cookies['access-token']
        ?? request.headers.authorization
        ?? request.body.accessToken;

    if (!tokenCookie) return response.status(401).json({ message: 'Missing access-token' });

    const [type, token] = tokenCookie.split(' ');

    if (type !== 'Bearer') return response.status(401).json({ message: 'Access token must be of type Bearer' });

    try {
        const payload = jsonwebtoken.verify(token, authConfig.privateKey) as AuthPayload;

        for (var key in payload) request[key] = payload[key];

        return next();
    } catch (e) {
        return response.status(401).json({ message: 'Invalid access token' });
    }
}

export function requireClearance(level: number) {
    return async (request: AuthRequest, response: Response, next: NextFunction) => {
        await authenticateToken(request, response, async () => {
            const [result] = await pool.execute<RowDataPacket[]>(
                'SELECT user.clearance_lvl FROM user WHERE user.username=?',
                [request.username],
            );

            if (result.length === 0) return response.sendStatus(401);

            const { clearance_lvl: clearanceLevel } = result[0];

            if (+clearanceLevel < level) return response.sendStatus(403);

            next();
        });
    };
}
