const BASE_URL = 'https://api.propublica.org/congress/v1';
const API_KEY = process.env.API_KEY || '';

const headers = {
    'X-API-Key': API_KEY,
};

export async function request(route: string) {
    console.log({
      route: `${BASE_URL}${route}`,
      headers,
    });
    const res = await fetch(`${BASE_URL}${route}`, {headers});
    let text = await res.text();
    let json;

    try {
        json = JSON.parse(text);
        return json;
    } catch (err: any) {
        if (err.message && err.message.includes("Unexpected token")) {
            text = text.replace(/\n\t+(?=[\w\d])/g, "\n");
            return JSON.parse(text.replace(/\n\n/g, "\\n"));
        } else {
            throw new Error('Unexpected JSON input.');
        }
    }
}
