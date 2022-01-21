const BASE_URL = 'https://api.propublica.org/congress/v1';
const API_KEY = process.env.API_KEY || '';

const headers = {
    'X-API-Key': API_KEY,
};

export async function request(route: string) {
    console.log(`${BASE_URL}${route}`);
    const res = await fetch(`${BASE_URL}${route}`, {headers});
    return res.json();
}
