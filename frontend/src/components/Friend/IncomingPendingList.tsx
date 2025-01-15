import { FriendType } from "../../type/FriendType";
import IncomingPendingItem from "./IncomingPendingItem";
interface FriendListProps {
  friendList: FriendType[];
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
}

export default function IncomingPendingList({
  friendList,
  onAccept,
  onReject,
}: FriendListProps) {
  const friendListSorted = friendList.sort((a, b) => {
    return a.userName.localeCompare(b.userName);
  });

  return (
    <>
      <div className="space-y-2">
        {friendListSorted.map((friend) => (
          <IncomingPendingItem
            friend={friend}
            key={friend.id}
            onReject={onReject}
            onAccept={onAccept}
          />
        ))}
      </div>
      {friendList.length === 0 && (
        <p className="text-white">No incoming pending requests.</p>
      )}
    </>
  );
}
