export type Note = {
  _id: string;
  title: string;
  content: string;
  userId: string;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};
