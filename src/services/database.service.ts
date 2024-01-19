import { createPool } from 'mysql2/promise';
import databaseConfig from '../configs/database.config';

export const pool = createPool(databaseConfig);
