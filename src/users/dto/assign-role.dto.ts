import { IsNumber, IsString } from 'class-validator';

export class AssignRoleDto {
   @IsString({message: 'Это поле должно быть строкой!'})
   readonly value: string;

   @IsNumber({}, {message: 'Это поле должно быть числом!'})
   readonly userId: number;
}