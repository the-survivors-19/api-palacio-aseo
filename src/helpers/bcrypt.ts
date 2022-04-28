import { hash, genSalt, compare } from 'bcrypt';

export const encryptPassword = async (password) => {
  const salt = await genSalt();
  return await hash(password, salt);
}

export const comparePassword = async (password, hash) => {
  return await compare(password, hash);
}