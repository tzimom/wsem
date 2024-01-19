import { RowDataPacket } from "mysql2";
import { pool } from "./database.service";

async function getDicts() {
    const [response] = await pool.query<RowDataPacket[]>(
        'SELECT dictionary.dictionary_id, dictionary.name, native_lang.lang_id AS "native_lang_id", '
        + 'native_lang.name AS "native_lang_name", native_lang.flag AS "native_lang_flag", '
        + 'foreign_lang.lang_id AS "foreign_lang_id", native_lang.name AS "native_lang_name", '
        + 'foreign_lang.flag AS "foreign_lang_flag" FROM dictionary '
        + 'JOIN lang AS native_lang ON native_lang.lang_id=dictionary.native_lang '
        + 'JOIN lang AS foreign_lang ON foreign_lang.lang_id=dictionary.foreign_lang'
    );

    const dictionaries = response.map(row => ({
        id: row.dictionary_id,
        name: row.name,
        nativeLanguage: {
            id: row.native_lang_id,
            name: row.native_lang_name,
            flag: row.native_lang_flag,
        },
        foreignLanguage: {
            id: row.foreign_lang_id,
            name: row.foreign_lang_name,
            flag: row.foreign_lang_flag,
        },
    }));

    return { statusCode: 200, dictionaries };
}

async function getDict(dictionaryId: string) {
    const [response] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM dictionary WHERE dictionary.dictionary_id=?',
        [dictionaryId],
    );

    if (response.length === 0) return { statusCode: 404, message: 'Dictionary not found' };

    const dictionary = {
        id: response[0].dictionary_id,
        name: response[0].name,
        nativeLanguage: response[0].native_lang,
        foreignLanguage: response[0].foreign_lang,
    };

    return { statusCode: 200, dictionary };
}

async function getDictWords(dictionaryId: string) {
    const [response] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM word WHERE word.dictionary_id=?',
        [dictionaryId],
    );

    const words = response.map(row => ({
        id: row.word_id,
        native: row.native_word,
        foreign: row.foreign_word,
    }));

    return { statusCode: 200, words };
}

async function getDictChapters(dictionaryId: string) {
    const [response] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM chapter WHERE chapter.dictionary_id=?',
        [dictionaryId],
    );

    const chapters = response.map(row => ({
        id: row.chapter_id,
        name: row.name,
    }));

    return { statusCode: 200, chapters };
}

async function getDictChapter(dictionaryId: string, chapterId: string) {
    const [response] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM chapter WHERE chapter.dictionary_id=? AND chapter.chapter_id=?',
        [dictionaryId, chapterId],
    );

    if (response.length === 0) return { statusCode: 404, message: 'Chapter not found' };

    const chapter = {
        id: response[0].chapter_id,
        name: response[0].name,
    };

    return { statusCode: 200, chapter };
}

async function getChapterWords(dictionaryId: string, chapterId: string) {
    const [response] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM word WHERE word.dictionary_id=? AND word.chapter_id=?',
        [dictionaryId, chapterId],
    );

    const words = response.map(row => ({
        id: row.word_id,
        native: row.native_word,
        foreign: row.foreign_word,
    }));

    return { statusCode: 200, words };
}

async function getDictTopics(dictionaryId: string) {
    const [response] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM topic WHERE topic.dictionary_id=?',
        [dictionaryId],
    );

    const topics = response.map(row => ({
        id: row.topic_id,
        name: row.name,
    }));

    return { statusCode: 200, topics };
}

async function getDictTopic(dictionaryId: string, topicId: string) {
    const [response] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM topic WHERE topic.dictionary_id=? AND topic.topic_id=?',
        [dictionaryId, topicId],
    );

    if (response.length === 0) return { statusCode: 404, message: 'Topic not found' };

    const topics = {
        id: response[0].topic_id,
        name: response[0].name,
    };

    return { statusCode: 200, topics };
}

export default { getDicts, getDict, getDictWords, getDictChapters, getDictChapter, getChapterWords, getDictTopics, getDictTopic };
