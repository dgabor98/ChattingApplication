import { Check, X } from "lucide-react";
import { FriendType } from "../../type/FriendType";

interface IncomingPendingProps {
  friend: FriendType;
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
}
export default function IncomingPendingItem({
  friend,
  onAccept,
  onReject,
}: IncomingPendingProps) {
  return (
    <div className="flex items-center gap-1">
      <label className="flex grow items-center gap-2 rounded-md border border-gray-400 bg-white px-10 hover:bg-slate-50">
        <span className="text-black">{friend.userName}</span>
      </label>{" "}
      <button
        onClick={() => onAccept(friend.id)}
        className="ml-4 rounded border-0 bg-green-500 px-1 py-1 text-white hover:bg-green-700"
      >
        <Check size={20} className="text-white" />
      </button>
      <button
        onClick={() => onReject(friend.id)}
        className="ml-4 rounded border-0 bg-red-500 px-1 py-1 text-white hover:bg-red-700"
      >
        <X size={20} className="text-white" />
      </button>
    </div>
  );
}
