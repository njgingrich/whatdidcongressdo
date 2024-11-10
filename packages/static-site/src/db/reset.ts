import fs from 'fs';
import path from 'path';
import {db} from './index';

function reset() {
    const resetSchema = fs.readFileSync(path.join(__dirname, 'schema', 'reset.sql')).toString();
    const schema = fs.readFileSync(path.join(__dirname, 'schema', 'schema.sql')).toString();
    console.info('[DB] Resetting schema.');
    db.exec(resetSchema).exec(schema);
    console.info('[DB] Schema reset.');
    db.close(() => {
        console.info('[DB] Connection closed.');
    });
}

reset();
