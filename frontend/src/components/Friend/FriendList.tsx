import { FriendType } from "../../type/FriendType";
import FriendItem from "./FriendItem";

interface FriendListProps {
  friendList: FriendType[];
  onDelete: (id: number) => void;
}

export default function FriendList({ friendList, onDelete }: FriendListProps) {
  const friendListSorted = friendList.sort((a, b) => {
    return a.userName.localeCompare(b.userName);
  });

  return (
    <>
      <div className="space-y-2">
        {friendListSorted.map((friend) => (
          <FriendItem friend={friend} key={friend.id} onDelete={onDelete} />
        ))}
      </div>
      {friendList.length === 0 && (
        <p className="text-center text-sm text-white">
          No friends yet. Add one.
        </p>
      )}
    </>
  );
}
