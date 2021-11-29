import appSrc from './app.js';
import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import http from 'http';
const app = appSrc(express, bodyParser, fs, crypto, http);
const PORT = process.env.PORT || 443;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
