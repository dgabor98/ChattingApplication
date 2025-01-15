/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { DataSource, Friendship } from "../api/api";
import { buildApiUrl } from "../utils/urlConstructer";
import { makeApiRequest } from "../utils/urlConstructer"; 
import { FriendType } from "../type/FriendType";

export const useFetchFriends = () => {
    const fetchUsers = useCallback(async (): Promise<FriendType[]> => {
        const url = buildApiUrl(DataSource.Friendship, Friendship.List);

        try {
            const users: FriendType[] = await makeApiRequest(url, 'GET');
            return users;
        } catch (error: any) {
            throw new Error(`Failed to fetch data. Error: ${error.message}`);
        }
    }, []); // Dependency array is empty because this function doesn't depend on external variables

    return fetchUsers;
};

export const useFetchIncomingPending = () => {
    const fetchUsers = useCallback(async (): Promise<FriendType[]> => {
        const url = buildApiUrl(DataSource.Friendship, Friendship.Pending);

        try {
            const users: FriendType[] = await makeApiRequest(url, 'GET');
            return users;
        } catch (error: any) {
            throw new Error(`Failed to fetch data. Error: ${error.message}`);
        }
    }, []); // Dependency array is empty because this function doesn't depend on external variables

    return fetchUsers;
};

export const useFetchOutgoingPending = () => {
    const fetchUsers = useCallback(async (): Promise<FriendType[]> => {
        const url = buildApiUrl(DataSource.Friendship, Friendship.OutgoingPending);

        try {
            const users: FriendType[] = await makeApiRequest(url, 'GET');
            return users;
        } catch (error: any) {
            throw new Error(`Failed to fetch data. Error: ${error.message}`);
        }
    }, []); // Dependency array is empty because this function doesn't depend on external variables

    return fetchUsers;
};
