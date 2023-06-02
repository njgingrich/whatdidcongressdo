import { Database, RunResult } from 'sqlite3';
import { getCacheUrl } from '~/api/v2/service';

export const db = new Database('cache.sqlite', (err) => {
    if (!err) {
        console.info('[DB] Opened connection.')
    }
});

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

function shutdown() {
    db.close((err) => {
        if (!err) {
            console.info('[DB] Shut down successfully.');
            process.exit(0);
        } else {
            console.info('[DB] There was an error shutting down the db:', err);
            process.exit(1);
        }
    })
}

export async function addRequest(url: URL, data: object) {
    const urlWithoutParams = getCacheUrl(url);

    console.info('[DB] INSERT INTO requests (url, response) VALUES (?, ?)', [urlWithoutParams, JSON.stringify(data)]);
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO requests (url, response) VALUES (?, ?)`, [urlWithoutParams, JSON.stringify(data)], (res: RunResult, err: any) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err);
            }
        });
    });
}

export async function getRequest(url: URL) {
    const urlWithoutParams = getCacheUrl(url);

    return new Promise((resolve, reject) => {
        console.info('[DB] SELECT response FROM requests WHERE url = ?', [urlWithoutParams]);
        db.get('SELECT response FROM requests WHERE url = ?', [urlWithoutParams], (err, row: any) => {
            if (!err) {
                if (!row || !row?.response) {
                    resolve(undefined);
                } else {
                    resolve(JSON.parse(row?.response));
                }
            }
    
            reject(err);
        });
    })
}
