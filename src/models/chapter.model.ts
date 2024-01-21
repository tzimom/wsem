export default interface Chapter {
    dictionaryId: number;
    id: number;
    name: string;
}

export function chapterFromRow(row: any): Chapter {
    return {
        dictionaryId: row.dictionary_id,
        id: row.chapter_id,
        name: row.name,
    };
}
