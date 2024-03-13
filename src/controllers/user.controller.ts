import { Controller, Post, Body, Put, Param, Get, HttpException, HttpStatus, Delete } from "@nestjs/common";
import { CreateUserDTO } from "src/models/user/create-dto";
import { EditUserDTO } from "src/models/user/edit-dto";
import { UserService } from "src/services/user.service";

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post()
  create(@Body() request: CreateUserDTO) {
    return this.userService.create(request);
  }

  @Put(":id")
  update(@Body() request: EditUserDTO, @Param('id') id: string) {
    return this.userService.update(id, request);
  }

  @Get()
  list() {
    return this.userService.listAll();
  }

  @Get(":id")
  listById(@Param('id') id: string) {
    return this.userService.listById(id);
  }

  @Delete(":id")
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}