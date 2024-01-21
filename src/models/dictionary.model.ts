import Language from "./language.model";

export default interface Dictionary {
    id: number;
    name: string;
    nativeLanguage: Language;
    foreignLanguage: Language;
}

export function dictionaryFromRow(row: any): Dictionary {
    return {
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
    };
}
