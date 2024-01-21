import { RowDataPacket } from 'mysql2';
import User, { userFromRow } from '../models/user.model';
import { pool } from '../services/database.service';
import authService from '../services/auth.service';

async function getByUsername(username: string): Promise<User | 'not found'> {
    const [userRows] = await pool.query<RowDataPacket[]>(`
        SELECT username, firstname, lastname, class
        FROM user_info
        WHERE username=?;`,
        [username],
    );

    if (userRows.length === 0) return 'not found';
    const userRow = userRows[0];

    return userFromRow(userRow);
}

async function create(user: User): Promise<{ password: string } | 'already exists'> {
    const password = authService.generatePassword();
    const salt = authService.generateSalt();
    const hash = authService.hashPassword(password, salt);

    try {
        await pool.query(`
            INSERT INTO user (username, pw_hash, pw_salt)
            VALUES (?, ?, ?);
            INSERT INTO user_info (username, firstname, lastname, class)
            VALUES (?, ?, ?, ?);`,
            [
                user.username, hash, salt,
                user.username, user.firstname, user.lastname, user.classname
            ],
        );

        return { password };
    } catch (error) {
        if (error.errno === 1062) return 'already exists';
        throw new Error(error);
    }
}

export default { getByUsername, create };
