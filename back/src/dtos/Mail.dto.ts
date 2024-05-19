import { PickType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class MailDto {
    CreateEmailResponse: string
    @IsEmail()
    from: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsString()
    name: string

    @IsString()
    htmlmessage: string
}
export class WelcomeMailDto extends PickType(MailDto,["email","name"]){}