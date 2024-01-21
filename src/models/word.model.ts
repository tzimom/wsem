export default interface Word {
    dictionaryId: number;
    chapterId: number;
    topicId: number;
    id: number;
    nativeWord: string;
    foreignWord: string;
}

export function wordFromRow(row: any): Word {
    return {
        dictionaryId: row.dictionary_id,
        chapterId: row.chapter_id,
        topicId: row.topic_id,
        id: row.word_id,
        nativeWord: row.native_word,
        foreignWord: row.foreign_word,
    };
}
