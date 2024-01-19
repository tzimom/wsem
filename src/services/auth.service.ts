import jsonwebtoken from 'jsonwebtoken';

import { sha256 } from 'hash.js';
import { generate } from 'generate-password';
import { ResponsePayload } from '../types';
import { pool } from './database.service';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { AuthPayload } from '../middleware/auth.middleware';
import authConfig from '../configs/auth.config';

function generatePassword(): string {
    return generate({
        length: authConfig.autoPasswordLength,
        numbers: true,
        strict: true,
    });
}

function generateSalt(): string {
    return generate({
        length: authConfig.saltLength,
        numbers: true,
        strict: true,
    });
}

function hashPassword(password: string, salt: string): string {
    return sha256().update(password + salt).digest('hex');
}

async function login(username: string, password: string): Promise<
    { token: string, requireUpdatePassword: boolean }
    | 'user not found' | 'incorrect password'> {
    const [userRows] = await pool.execute<RowDataPacket[]>(`
        SELECT pw_salt, pw_hash, req_update_pw
        FROM user WHERE user.username=?`,
        [username],
    );

    if (userRows.length === 0) return 'user not found';

    const {
        pw_salt: salt,
        pw_hash: correctHash,
        req_update_pw: requireUpdatePassword
    } = userRows[0];

    const hash = hashPassword(password, salt);
    if (hash !== correctHash) return 'incorrect password';

    const payload: AuthPayload = { username };
    const token = jsonwebtoken.sign(payload, authConfig.privateKey, { expiresIn: 2592000 });

    return { token, requireUpdatePassword };
}

async function resetPassword(username: string): Promise<
    { password: string } | 'user not found'> {
    const password = generatePassword();
    const salt = generateSalt();
    const hash = hashPassword(password, salt);

    const [result] = await pool.query<ResultSetHeader>(`
        UPDATE user
        SET pw_salt=?, pw_hash=?, req_update_pw=1
        WHERE username=?`,
        [salt, hash, username],
    );

    if (result.affectedRows === 0) return 'user not found';

    return { password };
}

async function updatePassword(username: string, currentPassword: string, newPassword: string)
    : Promise<'user not found' | 'incorrect password'> {
    const [userRows] = await pool.execute<RowDataPacket[]>(`
        SELECT pw_hash, pw_salt
        FROM user
        WHERE username=?`,
        [username],
    );

    if (userRows.length === 0) return 'user not found';

    const { pw_hash: correctHash, pw_salt: currentSalt } = userRows[0];

    const currentHash = hashPassword(currentPassword, currentSalt);
    if (currentHash !== correctHash) return 'incorrect password';

    const newSalt = generateSalt();
    const newHash = hashPassword(newPassword, newSalt);

    await pool.query(`
        UPDATE user
        SET pw_salt=?, pw_hash=?, req_update_pw=0
        WHERE username=?`,
        [newSalt, newHash, username],
    );
}


export default {
    login,
    generatePassword,
    generateSalt,
    hashPassword,
    resetPassword,
    updatePassword,
};
