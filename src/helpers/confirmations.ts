import { BadRequestException } from "@nestjs/common";

export const validateConfirmations = (data: object) => {
  const dataToValidate = Object.keys(data).filter(val => val.match(/(\w+_confirmation)/g));
  const errors = [];
  dataToValidate.forEach(element => {
    const value = element.split('_confirmation')[0];
    if(data[value] != data[element]) errors.push(`${value} no coincide con la confirmación.`);
  });
  if(errors.length > 0) throw new BadRequestException({message: errors});
}