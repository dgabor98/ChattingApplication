import { useCallback } from "react";
import { CRUD, DataSource } from "../api/api";
import { UserType } from "../type/UserType";
import { buildApiUrl } from "../utils/urlConstructer";
import { makeApiRequest } from "../utils/urlConstructer";  // Make sure to import this utility

const useFetchUsers = () => {
    const fetchUsers = useCallback(async (): Promise<UserType[]> => {
        const url = buildApiUrl(DataSource.Users, CRUD.GetAll);

        try {
            const users: UserType[] = await makeApiRequest(url, 'GET');
            return users;
        } catch (error: any) {
            throw new Error(`Failed to fetch data. Error: ${error.message}`);
        }
    }, []); // Dependency array is empty because this function doesn't depend on external variables

    return fetchUsers;
};

export default useFetchUsers;