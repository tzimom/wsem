import { Request, Response } from "express";
import usersService from "../services/users.service";
import User from "../models/user.model";

async function create(
    request: Request<{}, {}, { username: string; firstname: string; lastname: string; classname: string }, {}>,
    response: Response,
) {
    const { username, firstname, lastname, classname } = request.body;

    if (!username || !firstname || !lastname || !classname)
        return response.status(400).json({ message: 'Please provide: username, firstname, lastname, classname' });

    const user: User = { username, firstname, lastname, classname };

    try {
        const result = await usersService.create(user);

        if (result === 'already exists')
            return response.status(409).json({ message: 'User already exists' });

        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({ message: 'Unexpected error occurred' });
    }
}

async function getSelf(
    request: Request & {username: string},
    response: Response,
) {
    const { username } = request;

    try {
        const result = await usersService.getByUsername(username);

        if (result === 'not found')
            return response.status(404).json({ message: 'User does not exist' });

        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({ message: 'Unexpected error occurred' });
    }
}

export default { getSelf, create };
