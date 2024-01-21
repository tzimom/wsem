export default interface Topic {
    dictionaryId: number;
    id: number;
    name: string;
}

export function topicFromRow(row: any): Topic {
    return {
        dictionaryId: row.dictionary_id,
        id: row.topic_id,
        name: row.name,
    };
}
