import { Trash2 } from "lucide-react";
import { FriendType } from "../../type/FriendType";

interface FriendItemProps {
  friend: FriendType;
  onDelete: (id: number) => void;
}
export default function FriendItem({ friend, onDelete }: FriendItemProps) {
  return (
    <div className="flex items-center gap-1">
      <label className="flex grow items-center gap-2 rounded-md border border-gray-400 bg-white hover:bg-slate-50">
        <span className="text-black">{friend.userName}</span>
      </label>
      <button
        onClick={() => onDelete(friend.id)}
        className="ml-4 rounded border-0 bg-red-500 px-3 py-1 text-white hover:bg-red-700"
      >
        <Trash2 size={20} className="text-white" />
      </button>
    </div>
  );
}
