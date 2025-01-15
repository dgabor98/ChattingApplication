import { useState, useEffect } from "react";
import { FriendType } from "../type/FriendType";
import FriendList from "./Friend/FriendList";
import OutgoingPendingList from "./Friend/OutgoingPendingList";
import {
  useFetchFriends,
  useFetchIncomingPending,
  useFetchOutgoingPending,
} from "../datasource/FriendshipDataSource";
import { Link } from "react-router-dom";
import { DataSource, Friendship } from "../api/api";
import { buildApiUrl } from "../utils/urlConstructer";
import IncomingPendingList from "./Friend/IncomingPendingList";

export default function FriendPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [friendUsername, setFriendUsername] = useState("");
  const [isError, setIsError] = useState(false);

  const [friends, setFriends] = useState<FriendType[]>([]);
  const [outGoingPending, setOutgoingPending] = useState<FriendType[]>([]);
  const [incomingPending, setIncomingPending] = useState<FriendType[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFriends = useFetchFriends();
  const fetchOutGoingPending = useFetchOutgoingPending();
  const fetchIncomingGoingPending = useFetchIncomingPending();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFriends();
        setFriends(data);
        const outgoing = await fetchOutGoingPending();
        setOutgoingPending(outgoing);
        const incoming = await fetchIncomingGoingPending();
        setIncomingPending(incoming);
      } catch (err) {
        console.error(err);
        setError("Couldn't connect to database");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFriends]);

  async function deleteFriend(
    id: number,
    listType: "outgoing" | "incoming" | "friends",
  ): Promise<void> {
    try {
      let selectedList;
      let setListFunction;

      switch (listType) {
        case "outgoing":
          selectedList = outGoingPending;
          setListFunction = setOutgoingPending;
          break;
        case "incoming":
          selectedList = incomingPending;
          setListFunction = setIncomingPending;
          break;
        case "friends":
          selectedList = friends;
          setListFunction = setFriends;
          break;
        default:
          console.error("Invalid list type!");
          return;
      }

      const friendToDelete = selectedList.find((friend) => friend.id === id);
      console.log(id);

      if (!friendToDelete) {
        console.error("Friend not found!");
        return;
      }

      const url = `${buildApiUrl(DataSource.Friendship, Friendship.Remove)}?friendUsername=${encodeURIComponent(friendToDelete.userName)}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friendUsername: friendToDelete.userName }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete friend: ${response.statusText}`);
      }

      const updatedList = selectedList.filter((friend) => friend.id !== id);
      setListFunction(updatedList);

      console.log(`Successfully deleted ${friendToDelete.userName}`);
    } catch (error) {
      console.error("Error during friend deletion:", error);
    }
  }

  async function acceptFriend(id: number): Promise<void> {
    try {
      const friendToAccept = incomingPending.find((friend) => friend.id === id);
      console.log(id);
      if (!friendToAccept) {
        console.error("Friend not found!");
        return;
      }
      const url = `${buildApiUrl(DataSource.Friendship, Friendship.Accept)}?friendUsername=${encodeURIComponent(friendToAccept.userName)}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friendUsername: friendToAccept.userName }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to accept friend: ${response.statusText}`);
      }

      const updatedList = incomingPending.filter((friend) => friend.id !== id);
      const friends = await fetchFriends();
      setFriends(friends);
      setIncomingPending(updatedList);

      console.log(`Successfully accepted ${friendToAccept.userName}`);
    } catch (error) {
      console.error("Error during friend deletion:", error);
    }
  }

  const handleAddFriend = async () => {
    try {
      const url = `${buildApiUrl(DataSource.Friendship, Friendship.Request)}?friendUsername=${encodeURIComponent(friendUsername)}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: friendUsername }),
        credentials: "include",
      });

      if (!response.ok) {
        setIsError(true);
        throw new Error(`Failed to add friend: ${response.statusText}`);
      }

      setIsPopupOpen(false);
      const pending = await fetchOutGoingPending();
      setOutgoingPending(pending);
      setFriendUsername("");
      setIsError(false);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
    setFriendUsername("");
    setIsError(false);
  };

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
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="rounded-lg bg-gray-900 p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold text-white">Add a Friend</h2>
            <input
              type="text"
              placeholder="Enter username"
              value={friendUsername}
              onChange={(e) => setFriendUsername(e.target.value)}
              className={`mb-4 w-full rounded border p-2 text-white ${
                isError ? "border-red-500" : "border-gray-300"
              }`}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleAddFriend}
                className="rounded border-0 bg-green-500 px-4 py-2 text-white hover:bg-green-700"
              >
                Add
              </button>
              <button
                onClick={handleCancel}
                className="rounded border-0 bg-red-500 px-4 py-2 text-white hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-baseline">
        <div className="flex w-screen flex-col items-center justify-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-center text-3xl font-bold text-white underline">
              Friends
            </h1>
            <Link
              to="#"
              onClick={() => setIsPopupOpen(true)}
              className="text-2 rounded-full bg-green-500 px-3 py-1 text-white hover:bg-green-700"
            >
              +
            </Link>
          </div>
          <div className="mx-auto max-w-lg space-y-6 py-5">
            <FriendList
              friendList={friends}
              onDelete={(id) => deleteFriend(id, "friends")}
            />
          </div>
        </div>
        <div className="flex w-screen flex-col items-center justify-center">
          <h1 className="text-center text-3xl font-bold text-white underline">
            Outgoing
          </h1>
          <div className="mx-auto max-w-lg space-y-6 py-5">
            <OutgoingPendingList
              friendList={outGoingPending}
              onDelete={(id) => deleteFriend(id, "outgoing")}
            />
          </div>
        </div>
        <div className="flex w-screen flex-col items-center justify-center">
          <h1 className="text-center text-3xl font-bold text-white underline">
            Incoming
          </h1>
          <div className="mx-auto max-w-lg space-y-6 py-5">
            <IncomingPendingList
              friendList={incomingPending}
              onAccept={acceptFriend}
              onReject={(id) => deleteFriend(id, "incoming")}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
