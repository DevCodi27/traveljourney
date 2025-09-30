type User = {
  user: string;
  userId: number;
  role: number; // 1, 2, or 3
};


const users: User[] = [
  { user: "Stan", userId: 1, role: 1 },
  { user: "Alice", userId: 2, role: 2 },
  { user: "Bob", userId: 3, role: 3 },
  { user: "Charlie", userId: 4, role: 1 },
  { user: "Diana", userId: 5, role: 2 },
  { user: "Eve", userId: 6, role: 3 },
];

export default users;