import { FriendType } from "../../type/FriendType";
import OutgoingPendingItem from "./OutgoingPendingItem";

interface FriendListProps {
  friendList: FriendType[];
  onDelete: (id: number) => void;
}

export default function OutgoingPendingList({
  friendList,
  onDelete,
}: FriendListProps) {
  const friendListSorted = friendList.sort((a, b) => {
    return a.userName.localeCompare(b.userName);
  });

  return (
    <>
      <div className="space-y-2">
        {friendListSorted.map((friend) => (
          <OutgoingPendingItem
            friend={friend}
            key={friend.id}
            onDelete={onDelete}
          />
        ))}
      </div>
      {friendList.length === 0 && (
        <p className="text-white">No outgoing pending requests.</p>
      )}
    </>
  );
}
