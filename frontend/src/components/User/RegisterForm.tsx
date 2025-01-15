/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { UserAuth } from "../../api/api";
import { buildRootApiUrl } from "../../utils/urlConstructer";
import { useNavigate } from "react-router-dom";
export default function RegisterForm() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    userName: "",
    password: "",
    repPassword: "",
  });

  const handleChanges = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!values.userName || !values.password || !values.repPassword) {
      console.error("Please fill in all the required fields.");
      return;
    }

    if (values.password.length < 7) {
      console.error("Password is too short");
      return;
    }

    if (values.password !== values.repPassword) {
      console.error("Passwords do not match.");
      return;
    }

    try {
      const data = {
        userName: values.userName,
        password: values.password,
      };

      const url = buildRootApiUrl(UserAuth.Register);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Failed to register:", errorMessage);
        return;
      }

      console.log("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <main className="flex items-center justify-center rounded py-2">
      <form className="mx-auto max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="userName"
            className="mb-2 flex text-center text-sm font-medium text-white"
          >
            Your username
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            className="block w-full rounded-lg border border-gray-600 bg-[rgb(14,17,22)] p-2.5 text-sm text-white shadow-sm outline-none focus:border-2 focus:border-blue-600"
            value={values.userName}
            onChange={handleChanges}
            required
            autoComplete="username"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="mb-2 flex text-center text-sm font-medium text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="block w-full rounded-lg border border-gray-600 bg-[rgb(14,17,22)] p-2.5 text-sm text-white shadow-sm outline-none focus:border-2 focus:border-blue-600"
            value={values.password}
            onChange={handleChanges}
            required
            autoComplete="new-password"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="repPassword"
            className="mb-2 flex text-center text-sm font-medium text-white"
          >
            Repeat password
          </label>
          <input
            type="password"
            id="repPassword"
            name="repPassword"
            className="block w-full rounded-lg border border-gray-600 bg-[rgb(14,17,22)] p-2.5 text-sm text-white shadow-sm outline-none focus:border-2 focus:border-blue-600"
            value={values.repPassword}
            onChange={handleChanges}
            required
            autoComplete="new-password"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-l border-0 bg-green-600 text-white hover:bg-green-500 focus:bg-green-500"
        >
          Register
        </button>
      </form>
    </main>
  );
}
