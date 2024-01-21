import { RowDataPacket } from "mysql2";
import Language, { languageFromRow } from "../models/language.model";
import { pool } from "./database.service";

async function getAll(): Promise<Language[]> {
    const [languageRows] = await pool.query<RowDataPacket[]>(`
        SELECT lang_id, name, flag
        FROM lang`
    );

    return languageRows.map(languageFromRow);
}

async function getById(languageId: number): Promise<Language | 'not found'> {
    const [languageRows] = await pool.query<RowDataPacket[]>(`
        SELECT lang_id, name, flag
        FROM lang
        WHERE lang_id=?`,
        [languageId],
    );

    if (languageRows.length === 0) return 'not found';
    const languageRow = languageRows[0];

    return languageFromRow(languageRow);
}

export default { getAll, getById };
