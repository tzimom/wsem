import { Request, Response } from "express";
import authService from '../services/auth.service';

async function login(
    request: Request<{}, {}, { username: string; password: string }, {}>,
    response: Response,
) {
    const { username, password } = request.body;

    if (!username || !password)
        return response.status(400).json({ message: 'Please provide: username, password' });

    try {
        const result = await authService.login(username, password);

        if (result === 'user not found')
            return response.status(404).json({ message: 'User not found' });

        if (result === 'incorrect password')
            return response.status(401).json({ message: 'Incorrect password' });

        response.cookie("access-token", `Bearer ${result.token}`, {
            httpOnly: true,
            maxAge: 2592000,
            sameSite: 'none',
        });
        response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({ message: 'Unexpected error occurred' });
    }
}

function logout(_request: Request, response: Response) {
    return response.clearCookie('access-token').sendStatus(204);
}

async function resetPassword(
    request: Request<{}, {}, { username: string }, {}>,
    response: Response,
) {
    const { username } = request.body;

    if (!username) return response.status(400).json({ message: 'Please provide: username' });

    try {
        const result = await authService.resetPassword(username);

        if (result === 'user not found')
            return response.status(404).json({ message: 'User not found' });

        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({ message: 'Unexpected error occurred' });
    }
}

async function updatePassword(
    request: Request<{}, {}, { currentPassword: string, newPassword: string }, {}> & { username: string },
    response: Response,
) {
    const { currentPassword, newPassword } = request.body;

    if (!currentPassword || !newPassword)
        return response.status(400).json({ message: 'Please provide: currentPassword, newPassword' });

    try {
        const result = await authService.updatePassword(request.username, currentPassword, newPassword);

        if (result === 'user not found')
            return response.status(404).json({ message: 'User not found' });

        if (result === 'incorrect password')
            return response.status(401).json({ message: 'Incorrect password' });

        return response.sendStatus(204);
    } catch (error) {
        return response.status(500).json({ message: 'Unexpected error occurred' });
    }
}

export default { login, logout, resetPassword, updatePassword };
