import { Request, Response } from "express";
import dictionariesService from "../services/dictionaries.service";

async function getAll(_request: Request, response: Response) {
    try {
        const result = await dictionariesService.getAll();
        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({ message: 'An unexpected error occurred' });
    }
}

async function getById(
    request: Request<{ dictionaryId: number }, {}, {}, {}>,
    response: Response,
) {
    const { dictionaryId } = request.params;

    if (isNaN(dictionaryId))
        return response.status(400).json({
            message: `Dictionary id has to be a number, instead got: '${dictionaryId}'`
        });

    try {
        const result = await dictionariesService.getById(dictionaryId);

        if (result === 'not found')
            return response.status(404).json({ message: 'Dictionary not found' });

        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({ message: 'An unexpected error occurred' });
    }
}

async function getChapters(
    request: Request<{ dictionaryId: number }, {}, {}, {}>,
    response: Response,
) {
    const { dictionaryId } = request.params;

    if (isNaN(dictionaryId))
        return response.status(400).json({
            message: `Dictionary id has to be a number, instead got: '${dictionaryId}'`
        });

    try {
        const result = await dictionariesService.getChapters(dictionaryId);
        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({ message: 'An unexpected error occurred' });
    }
}

async function getChapterById(
    request: Request<{ dictionaryId: number; chapterId: number }, {}, {}, {}>,
    response: Response,
) {
    const { dictionaryId, chapterId } = request.params;

    if (isNaN(dictionaryId))
        return response.status(400).json({
            message: `Dictionary id has to be a number, instead got: '${dictionaryId}'`
        });

    if (isNaN(chapterId))
        return response.status(400).json({
            message: `Chapter id has to be a number, instead got: '${chapterId}'`
        });

    try {
        const result = await dictionariesService.getChapterById(dictionaryId, chapterId);

        if (result === 'not found')
            return response.status(404).json({ message: 'Chapter not found' });

        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({ message: 'An unexpected error occurred' });
    }
}

async function getTopics(
    request: Request<{ dictionaryId: number }, {}, {}, {}>,
    response: Response,
) {
    const { dictionaryId } = request.params;

    if (isNaN(dictionaryId))
        return response.status(400).json({
            message: `Dictionary id has to be a number, instead got: '${dictionaryId}'`
        });

    try {
        const result = await dictionariesService.getTopics(dictionaryId);
        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({ message: 'An unexpected error occurred' });
    }
}

async function getTopicById(
    request: Request<{ dictionaryId: number; topicId: number }, {}, {}, {}>,
    response: Response,
) {
    const { dictionaryId, topicId } = request.params;

    if (isNaN(dictionaryId))
        return response.status(400).json({
            message: `Dictionary id has to be a number, instead got: '${dictionaryId}'`
        });

    if (isNaN(topicId))
        return response.status(400).json({
            message: `Topic id has to be a number, instead got: '${topicId}'`
        });

    try {
        const result = await dictionariesService.getTopicById(dictionaryId, topicId);

        if (result === 'not found')
            return response.status(404).json({ message: 'Topic not found' });

        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({ message: 'An unexpected error occurred' });
    }
}

async function getWords(
    request: Request<{ dictionaryId: number }, {}, {}, { limit: number; offset: number }>,
    response: Response,
) {
    const { dictionaryId } = request.params;

    if (isNaN(dictionaryId))
        return response.status(400).json({
            message: `Dictionary id has to be a number, instead got: '${dictionaryId}'`
        });

    try {
        const result = await dictionariesService.getWords(dictionaryId);
        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({ message: 'An unexpected error occurred' });
    }
}

async function getWordById(
    request: Request<{ dictionaryId: number; wordId: number }, {}, {}, {}>,
    response: Response,
) {
    const { dictionaryId, wordId } = request.params;

    if (isNaN(dictionaryId))
        return response.status(400).json({ message: `'${dictionaryId}' is not a number` });

    try {
        const result = await dictionariesService.getWordById(dictionaryId, wordId);

        if (result === 'not found')
            return response.status(404).json({ message: 'Word not found' });

        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({ message: 'An unexpected error occurred' });
    }
}

export default {
    getAll,
    getById,
    getChapters,
    getChapterById,
    getTopics,
    getTopicById,
    getWords,
    getWordById
};
