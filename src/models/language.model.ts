export default interface Language {
    id: number;
    name: string;
    flag: string;
}

export function languageFromRow(row: any): Language {
    return {
        id: row.lang_id,
        name: row.name,
        flag: row.flag,
    };
}
