import { X } from "lucide-react";
import { FriendType } from "../../type/FriendType";

interface PendingItemProps {
  friend: FriendType;
  onDelete: (id: number) => void;
}
export default function PendingItem({ friend, onDelete }: PendingItemProps) {
  return (
    <div className="flex items-center gap-1">
      <label className="flex grow items-center gap-2 rounded-md border border-gray-400 bg-white px-10 hover:bg-slate-50">
        <span className="text-black">{friend.userName}</span>
      </label>
      <button
        onClick={() => onDelete(friend.id)}
        className="ml-4 rounded border-0 bg-red-500 px-1 py-1 text-white hover:bg-red-700"
      >
        <X size={20} className="text-white" />
      </button>
    </div>
  );
}
