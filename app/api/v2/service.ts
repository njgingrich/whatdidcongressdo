const BASE_URL = 'https://api.congress.gov/v3';
const API_KEY = process.env.DATA_GOV_API_KEY || '';

export interface PaginationOptions {
    limit?: number;
    offset?: number;
}

export async function request(route: string, paginationOptions?: PaginationOptions) {
    const url = new URL(`${BASE_URL}${route}`);
    url.searchParams.append('limit', `${paginationOptions?.limit ?? 50}`);
    if (paginationOptions?.offset) {
        url.searchParams.append('offset', `${paginationOptions.offset}`);
    }
    url.searchParams.append('api_key', API_KEY);

    console.info(`[API]: ${url}`)
    const res = await fetch(url);
    return res.json();
}
