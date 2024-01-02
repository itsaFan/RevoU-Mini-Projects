export interface User {
  username: string;
  password: string;
  role: string;
}

export const users: User[] = [
  { username: "user", password: "pass123", role: "user" },
  { username: "admin", password: "pass123", role: "admin" },
];


