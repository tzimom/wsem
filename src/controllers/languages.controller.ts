import { Request, Response } from "express";
import languagesService from "../services/languages.service";

async function getAll(_request: Request, response: Response) {
    try {
        const result = await languagesService.getAll();
        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({ message: 'Unexpected error occurred' });
    }
}

async function getById(
    request: Request<{ languageId: number }, {}, {}, {}>,
    response: Response,
) {
    const { languageId } = request.params;

    if (isNaN(languageId))
        return response.status(400).json({ message: `Language id has to be a number, instead got: ${languageId}` });

    try {
        const result = await languagesService.getById(languageId);

        if (result === 'not found')
            return response.status(404).json({ message: 'Language not found' });

        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({ message: 'Unexpected error occurred' });
    }
}

export default { getAll, getById };
