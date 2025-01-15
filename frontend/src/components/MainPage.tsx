import { useState, useEffect } from "react";
import useFetchUsers from "../datasource/UserTypeDataSource";
import { UserType } from "../type/UserType";
import UserList from "./User/UserList";

export default function MainPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useFetchUsers();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError("Couldn't connect to database");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchUsers]);

  function setUserActive(id: number, active: boolean) {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { ...user, active } : user)),
    );
  }
  function deleteUser(_id: number) {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== _id));
  }

  if (loading) {
    return (
      <div className="flex w-screen items-center justify-center">
        <h1 className="text-center text-3xl font-bold text-black underline">
          Loading...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-screen items-center justify-center">
        <h1 className="text-center text-3xl font-bold text-black underline">
          Error: {error}
        </h1>
      </div>
    );
  }

  return (
    <main>
      <div className="flex w-screen items-center justify-center">
        <h1 className="text-center text-3xl font-bold text-white underline">
          Users
        </h1>
      </div>
      <div className="mx-auto max-w-lg space-y-6 py-5">
        <UserList
          userList={users}
          onActivatedChange={setUserActive}
          onDelete={deleteUser}
        />
      </div>
    </main>
  );
}
