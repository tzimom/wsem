import { Router } from "express";
import vocabController from "../controllers/vocab.controller";

const router = Router();

router.get('/dicts', vocabController.getDicts);
router.get('/dicts/:dict_id', vocabController.getDictById);
router.get('/dicts/:dict_id/words', vocabController.getDictWords);
router.get('/dicts/:dict_id/chapters', vocabController.getDictChapters);
router.get('/dicts/:dict_id/chapters/:chapter_id', vocabController.getDictChapterById);
router.get('/dicts/:dict_id/chapters/:chapter_id/words', vocabController.getChapterWords);
router.get('/dicts/:dict_id/topics', vocabController.getDictTopics);
router.get('/dicts/:dict_id/topics/:topic_id', vocabController.getDictTopicById);

export default { router };
