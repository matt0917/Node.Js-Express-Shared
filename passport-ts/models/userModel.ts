
const database = [
  {
    id: "1",
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    role: "user",
    password: "jimmy123!",
  },
  {
    id: "2",
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    role: "user",
    password: "johnny123!",
  },
  {
    id: "3",
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    role: "user",
    password: "jonathan123!",
  },
  {
    id: "4",
    name: "Joonseo Park",
    email: "jsp@gmail.com",
    role: "admin",
    password: "123",
  },
];

const userModel = {
  /* 
  FIXED (types)
  */
  findOne: (email: string) : Express.User | null => {
    const user = database.find((user) : boolean => user.email === email);
    if (user) {
      return user;
    }
    console.log(`Couldn't find user with email: ${email}`);
    return null;
  },
  /*
  FIXED (types)
  */
  findById: (id: string) : Express.User | null => {
    const user = database.find((user) : boolean  => user.id === id);
    if (user) {
      return user;
    }
    console.log(`Couldn't find user with id: ${id}`);
    return null;
  },
};

export { database, userModel };
