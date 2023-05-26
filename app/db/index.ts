import { Database } from 'sqlite3';

export const db = new Database('cache.sqlite');

export function addRequest(url: URL, data: object) {
    const urlWithoutParams = new URL(url.pathname, url.href).href;

    db.run(`INSERT INTO requests (url, response) VALUES (?, ?)`, [urlWithoutParams, JSON.stringify(data)])
}

export function getRequest(url: URL) {
    const urlWithoutParams = new URL(url.pathname, url.href).href;

    db.get('SELECT response FROM requests WHERE url = ?', [urlWithoutParams], (err, row) => {
        if (!err && typeof row === 'string') {
            return JSON.parse(row);
        }

        return undefined;
    });
}
