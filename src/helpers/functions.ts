import { CreateUserDto } from "src/users/dto/create-user.dto"

export const responseUser = (data: CreateUserDto) => {
  const {
    password,
    password_confirmation,
    ...res 
  } = data;
  return res;
}