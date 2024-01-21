import { Router } from "express";
import dictionariesController from "../controllers/dictionaries.controller";

const router = Router();

router.get('/', dictionariesController.getAll);
router.get('/:dictionaryId', dictionariesController.getById);

router.get('/:dictionaryId/chapters', dictionariesController.getChapters);
router.get('/:dictionaryId/chapters/:chapterId', dictionariesController.getChapterById);

router.get('/:dictionaryId/topics', dictionariesController.getTopics);
router.get('/:dictionaryId/topics/:topicId', dictionariesController.getTopicById);

router.get('/:dictionaryId/words', dictionariesController.getWords);
router.get('/:dictionaryId/words/:wordId', dictionariesController.getWordById);

export default { router };
