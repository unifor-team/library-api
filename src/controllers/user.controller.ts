import { Controller, Post, Body } from "@nestjs/common";
import { CreateUserDTO } from "src/models/user/create-dto";
import { UserService } from "src/services/user.service";

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post()
  create(@Body() request: CreateUserDTO) {
    return this.userService.create(request);
  }
}