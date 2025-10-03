type User = {
  user: string;
  userId: number;
  role: number; // 1, 2, or 3
  password:string
};


const users: User[] = [
  { user: "Stan", userId: 1, role: 1, password: "Abishek" },
  { user: "Alice", userId: 2, role: 2, password: "Alice123" },
  { user: "Bob", userId: 3, role: 3, password: "Bob123" },
  { user: "Charlie", userId: 4, role: 1, password: "Charlie123" },
  { user: "Diana", userId: 5, role: 2, password: "Diana123" },
  { user: "Eve", userId: 6, role: 3, password: "Eve123" },
];

export default users;