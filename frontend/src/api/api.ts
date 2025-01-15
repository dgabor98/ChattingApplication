export const BASE_URL = "http://localhost:8080";

export enum DataSource {
  ROOT = "",
  Users = "user",
  Friendship = "friendList"
}

export enum CRUD {
  GetAll = "getAll",
  Get = "get",
  Add = "add",
  Delete = "delete",
  Update = "update",
}

export enum UserAuth {
  Register = "register",
  Login = "login",
  Logout = "logout",
}

export enum Friendship {
  Request = "request",
  Accept = "accept",
  List = "list",
  Pending = "pending",
  OutgoingPending = "pendingFrom",
  Users = "users",
  Remove = "remove"
}