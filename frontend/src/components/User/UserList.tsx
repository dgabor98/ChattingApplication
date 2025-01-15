import { UserType } from "../../type/UserType";
import UserItem from "./UserItem";

interface UserListProps {
  userList: UserType[];
  onActivatedChange: (id: number, isActive: boolean) => void;
  onDelete: (id: number) => void;
}

export default function UserList({
  userList,
  onActivatedChange,
  onDelete,
}: UserListProps) {
  const userListSorted = userList.sort((a, b) => {
    if (a.userName.localeCompare(b.userName) !== 0) {
      return a.userName.localeCompare(b.userName);
    }
    if (a.id !== b.id) {
      return b.id - a.id;
    }
    return a.isActive ? -1 : 1;
  });

  return (
    <>
      <div className="space-y-2">
        {userListSorted.map((user) => (
          <UserItem
            user={user}
            key={user.id}
            onActiveChange={onActivatedChange}
            onDelete={onDelete}
          />
        ))}
      </div>
      {userList.length === 0 && (
        <p className="text-center text-sm text-black">No users yet. Add one.</p>
      )}
    </>
  );
}
