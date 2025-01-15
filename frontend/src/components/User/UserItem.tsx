import { Trash2 } from "lucide-react";
import { UserType } from "../../type/UserType";

interface UserItemProps {
  user: UserType;
  onActiveChange: (id: number, isActive: boolean) => void;
  onDelete: (id: number) => void;
}
export default function UserItem({
  user,
  onActiveChange,
  onDelete,
}: UserItemProps) {
  return (
    <div className="flex items-center gap-1">
      <label className="flex grow items-center gap-2 rounded-md border border-gray-400 bg-white hover:bg-slate-50">
        <input
          type="checkbox"
          checked={user.isActive}
          onChange={(e) => onActiveChange(user.id, e.target.checked)}
          className="scale-125"
        />
        <span
          className={
            user.isActive ? "text-black" : "text-gray-800 line-through"
          }
        >
          {user.userName}
        </span>
      </label>
      <button onClick={() => onDelete(user.id)} className="p-2">
        <Trash2 size={20} className="text-white" />
      </button>
    </div>
  );
}
