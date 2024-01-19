import { Request, Response } from "express";
import usersService from "../services/users.service";
import User from "../models/user.model";
import { AuthRequest } from "../middleware/auth.middleware";

async function createUser(request: Request, response: Response) {
    const { username, firstname, lastname, classname } = request.body;

    if (!username || !firstname || !lastname || !classname)
        return response.status(400).json({ message: 'Please provide: username, firstname, lastname, classname' });

    const user: User = { username, firstname, lastname, classname };

    try {
        const result = await usersService.createUser(user);

        if (result === 'already exists')
            return response.status(409).json({ message: 'User already exists' });

        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({ message: 'Unexpected error occurred' });
    }
}

async function getSelfUser(request: AuthRequest, response: Response) {
    const { username } = request;

    try {
        const result = await usersService.getUser(username);

        if (result === 'not found')
            return response.status(404).json({ message: 'User does not exist' });

        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({ message: 'Unexpected error occurred' });
    }
}

/*
async function getWordProgress(request: AuthRequest, response: Response) {
    const { wordId } = request.body;

    if (!wordId)
        return response.status(400).json({ message: 'You have to specify a wordId' });

    const payload = await usersService.getWordProgress(request.username, wordId);

    response.status(payload.statusCode).json(payload);
}

async function postWordProgress(request: AuthRequest, response: Response) {
    const { wordId, typedWord } = request.body;

    if (!wordId || !typedWord)
        return response.status(400).json({ error: 'You have to specify a wordId and a typedWord' });

    const payload = await usersService.postWordProgress(request.username, wordId, typedWord);

    response.status(payload.statusCode).json(payload);
}
*/

export default { getSelfUser, createUser };
