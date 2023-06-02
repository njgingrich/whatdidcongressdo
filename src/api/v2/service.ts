import { addRequest, getRequest } from "~/db";

const BASE_URL = 'https://api.congress.gov/v3';
const API_KEY = process.env.DATA_GOV_API_KEY || '';

export interface PaginationOptions {
    limit?: number;
    offset?: number;
}

interface RequestOptions {
    pagination?: PaginationOptions;
    cache?: boolean;
}

export async function request(route: string, {pagination, cache}: RequestOptions = {}) {
    const url = new URL(`${BASE_URL}${route}`);

    if (cache) {
        const cached = await getRequest(url);
        console.info(`[API] Returning cached value for ${route}`);
        if (cached) {
            return cached;
        }
    }
    if (pagination?.limit) {
        url.searchParams.append('limit', `${pagination.limit}`);
    }
    if (pagination?.offset) {
        url.searchParams.append('offset', `${pagination.offset}`);
    }
    url.searchParams.append('api_key', API_KEY);

    console.info(`[API]: ${url}`)
    const res = await fetch(url);
    const json = await res.json();

    if (cache) {
        const res = await addRequest(url, json);
        console.log({res});
    }

    return json;
}

export function apiPath(url: string) {
    const path = (new URL(url)).pathname;
    // Remove leading /v3
    return path.slice(3);
}

export function getCacheUrl(url: URL) {
    return new URL(url.pathname, url.href).href;
}