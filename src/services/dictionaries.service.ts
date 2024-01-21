import { RowDataPacket } from "mysql2";
import { pool } from "./database.service";
import Dictionary, { dictionaryFromRow } from "../models/dictionary.model";
import Chapter, { chapterFromRow } from "../models/chapter.model";
import Topic, { topicFromRow } from "../models/topic.model";
import Word, { wordFromRow } from "../models/word.model";

async function getAll(): Promise<Dictionary[]> {
    const [dictionaryRows] = await pool.query<RowDataPacket[]>(`
        SELECT
            dictionary_id, dictionary.name,
            native_lang.lang_id AS "native_lang_id",
            native_lang.name AS "native_lang_name",
            native_lang.flag AS "native_lang_flag",
            foreign_lang.lang_id AS "foreign_lang_id",
            foreign_lang.name AS "foreign_lang_name",
            foreign_lang.flag AS "foreign_lang_flag"
        FROM dictionary
        JOIN lang AS native_lang
            ON native_lang.lang_id=dictionary.native_lang
        JOIN lang AS foreign_lang
            ON foreign_lang.lang_id=dictionary.foreign_lang`
    );

    return dictionaryRows.map(dictionaryFromRow);
}

async function getById(dictionaryId: number): Promise<Dictionary | 'not found'> {
    const [dictionaryRows] = await pool.query<RowDataPacket[]>(`
        SELECT
            dictionary_id, dictionary.name,
            native_lang.lang_id AS "native_lang_id",
            native_lang.name AS "native_lang_name",
            native_lang.flag AS "native_lang_flag",
            foreign_lang.lang_id AS "foreign_lang_id",
            foreign_lang.name AS "foreign_lang_name",
            foreign_lang.flag AS "foreign_lang_flag"
        FROM dictionary
        JOIN lang AS native_lang
            ON native_lang.lang_id=dictionary.native_lang
        JOIN lang AS foreign_lang
            ON foreign_lang.lang_id=dictionary.foreign_lang
        WHERE dictionary_id=?`,
        [dictionaryId],
    );

    if (dictionaryRows.length === 0) return 'not found';
    const dictionaryRow = dictionaryRows[0];

    return dictionaryFromRow(dictionaryRow);
}

async function getChapters(dictionaryId: number): Promise<Chapter[]> {
    const [chapterRows] = await pool.query<RowDataPacket[]>(`
        SELECT dictionary_id, chapter_id, name
        FROM chapter
        WHERE dictionary_id=?`,
        [dictionaryId],
    );

    return chapterRows.map(chapterFromRow);
}

async function getChapterById(dictionaryId: number, chapterId: number)
    : Promise<Chapter | 'not found'> {
    const [chapterRows] = await pool.query<RowDataPacket[]>(`
        SELECT dictionary_id, chapter_id, name
        FROM chapter
        WHERE dictionary_id=? AND chapter_id=?`,
        [dictionaryId, chapterId],
    );

    if (chapterRows.length === 0) return 'not found';
    const chapterRow = chapterRows[0];

    return chapterFromRow(chapterRow);
}

async function getTopics(dictionaryId: number): Promise<Topic[]> {
    const [topicRows] = await pool.query<RowDataPacket[]>(`
        SELECT dictionary_id, topic_id, name
        FROM topic
        WHERE dictionary_id=?`,
        [dictionaryId],
    );

    return topicRows.map(topicFromRow);
}

async function getTopicById(dictionaryId: number, topicId: number)
    : Promise<Topic | 'not found'> {
    const [topicRows] = await pool.query<RowDataPacket[]>(`
        SELECT dictionary_id, topic_id, name
        FROM topic
        WHERE dictionary_id=? AND topic_id=?`,
        [dictionaryId, topicId],
    );

    if (topicRows.length === 0) return 'not found';
    const topicRow = topicRows[0];

    return topicFromRow(topicRow);
}

async function getWords(dictionaryId: number): Promise<Word[]> {
    const [wordRows] = await pool.query<RowDataPacket[]>(`
        SELECT
            dictionary_id, chapter_id, topic_id, word_id,
            native_word, foreign_word
        FROM word
        WHERE dictionary_id=?`,
        [dictionaryId],
    );

    return wordRows.map(wordFromRow);
}

async function getWordById(dictionaryId: number, wordId: number)
    : Promise<Word | 'not found'> {
    const [wordRows] = await pool.query<RowDataPacket[]>(`
        SELECT
            dictionary_id, chapter_id, topic_id, word_id,
            native_word, foreign_word
        FROM word
        WHERE dictionary_id=? AND word_id=?`,
        [dictionaryId, wordId],
    );

    if (wordRows.length === 0) return 'not found';
    const wordRow = wordRows[0];

    return wordFromRow(wordRow);
}

export default {
    getAll,
    getById,
    getChapters,
    getChapterById,
    getTopics,
    getTopicById,
    getWords,
    getWordById,
};
