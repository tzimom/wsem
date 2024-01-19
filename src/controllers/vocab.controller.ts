import { Request, Response } from "express";
import vocabService from "../services/vocab.service";

async function getDicts(_request: Request, response: Response) {
    const payload = await vocabService.getDicts();

    response.status(payload.statusCode).json(payload);
}

async function getDictById(request: Request, response: Response) {
    const payload = await vocabService.getDict(request.params.dict_id);

    response.status(payload.statusCode).json(payload);
}

async function getDictWords(request: Request, response: Response) {
    const payload = await vocabService.getDictWords(request.params.dict_id);

    response.status(payload.statusCode).json(payload);
}

async function getDictChapters(request: Request, response: Response) {
    const payload = await vocabService.getDictChapters(request.params.dict_id);

    response.status(payload.statusCode).json(payload);
}

async function getDictChapterById(request: Request, response: Response) {
    const { dict_id: dictionaryId, chapter_id: chapterId } = request.params;
    const payload = await vocabService.getDictChapter(dictionaryId, chapterId);

    response.status(payload.statusCode).json(payload);
}

async function getChapterWords(request: Request, response: Response) {
    const { dict_id: dictionaryId, chapter_id: chapterId } = request.params;
    const payload = await vocabService.getChapterWords(dictionaryId, chapterId);

    response.status(payload.statusCode).json(payload);
}

async function getDictTopics(request: Request, response: Response) {
    const payload = await vocabService.getDictTopics(request.params.dict_id);

    response.status(payload.statusCode).json(payload);
}

async function getDictTopicById(request: Request, response: Response) {
    const { dict_id: dictionaryId, topic_id: topicId } = request.params;
    const payload = await vocabService.getDictTopic(dictionaryId, topicId);

    response.status(payload.statusCode).json(payload);
}

export default { getDicts, getDictById, getDictWords, getDictChapters, getDictChapterById, getChapterWords, getDictTopics, getDictTopicById };
