import { BASE_URL, DataSource } from "../api/api";

export const buildApiUrl = <T extends Record<string, string>>(dataSource: DataSource, action: T[keyof T]): string => {
    return `${BASE_URL}/${dataSource}/${action}`;
};
export const buildRootApiUrl = <T extends Record<string, string>>(action: T[keyof T]): string => {
    return `${BASE_URL}/${action}`;
};

export const makeApiRequest = async (url: string, method: string = 'GET', body?: any) => {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
        credentials: 'include',
    });

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Request failed with status: ' + response.status);
    }
};