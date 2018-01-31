'use strict';

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser'

import { constants } from '../constants';

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

import authentication from './routes/authentication';
app.use(constants.API_AUTH_PREFIX, authentication);

import posts from './routes/posts';
app.use(`${constants.API_PREFIX}/posts`, posts);

const server = app.listen(PORT, () => {
    console.log('Express listening on port', PORT);
});