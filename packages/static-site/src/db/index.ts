import Database from 'better-sqlite3';
import { getCacheUrl } from '~/api/v2/service';

export const db = new Database('cache.sqlite');
db.pragma("journal_mode = WAL");

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

function shutdown() {
    db.close()
}

export async function addRequest(url: URL, data: object) {
    const urlWithoutParams = getCacheUrl(url);

    console.info('[DB] INSERT INTO requests (url, response) VALUES (?, ?)', [urlWithoutParams, JSON.stringify(data)]);
    return new Promise((resolve, reject) => {
        const stmt = db.prepare(`INSERT INTO requests (url, response) VALUES (@url, @response)`);
        const queryData = { url: urlWithoutParams, response: JSON.stringify(data) };
        resolve(stmt.run(queryData));
    });
}

export async function getRequest(url: URL) {
    const urlWithoutParams = getCacheUrl(url);

    return new Promise((resolve, reject) => {
        console.info('[DB] SELECT response FROM requests WHERE url = ?', [urlWithoutParams]);
        
        const stmt = db.prepare('SELECT response FROM requests WHERE url = ?');
        const result = stmt.get(urlWithoutParams);

        if (!result) {
            resolve(undefined);
        }

        // @ts-expect-error
        resolve(JSON.parse(result.response));
    })
}
