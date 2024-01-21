import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoute from './routes/auth.route';
import usersRoute from './routes/users.route';
import languagesRoute from './routes/languages.route';
import dictionariesRoute from './routes/dictionaries.route';

const app = express();
const port = +(process.env.PORT ?? 3000);

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use('/auth', authRoute.router);
app.use('/users', usersRoute.router);
app.use('/languages', languagesRoute.router);
app.use('/dictionaries', dictionariesRoute.router);

app.listen(port, () => console.log(`Listening on port ${port}`));
