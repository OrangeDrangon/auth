interface User {
  email: string;
  displayname: string;
}

export async function validateUser(
  email?: string,
  password?: string
): Promise<User | null> {
  // if email is in db and hashed password === hashing password
  if (email == null || password == null) {
    return null;
  }

  return { email, displayname: "John" };
}
