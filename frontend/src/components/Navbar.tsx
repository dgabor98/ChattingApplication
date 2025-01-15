import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl justify-between p-4">
        <div className="flex flex-row items-baseline">
          <Link to="/" className="flex items-center">
            <span className="text-3xl font-semibold dark:text-white">Home</span>
          </Link>
          {isLoggedIn && (
            <Link to="/friends" className="flex rounded px-3 py-2 text-white">
              Friends
            </Link>
          )}
        </div>
        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-multi-level"
        >
          <ul className="md: mt-4 flex p-4 md:mt-0 md:space-x-8 md:p-0">
            {isLoggedIn ? (
              <>
                <li>
                  <button
                    onClick={logout}
                    className="flex rounded bg-red-500 px-3 py-2 text-white hover:bg-red-800"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="flex rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-800"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="flex rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-800"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
