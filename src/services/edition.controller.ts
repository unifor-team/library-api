import { Controller, Post, Body, Put, Param, Get, HttpException, HttpStatus, Delete } from "@nestjs/common";
import { CreateEditionDTO } from "src/models/edition/create-dto";
import { EditEditionDTO } from "src/models/edition/edit-dto";
import { EditionService } from "src/services/edition.service";

@Controller('edition')
export class EditionController {
  constructor(private editionService: EditionService) { }

  @Post()
  create(@Body() request: CreateEditionDTO) {
    return this.editionService.create(request);
  }

  @Put(":id")
  update(@Body() request: EditEditionDTO, @Param('id') id: string) {
    return this.editionService.update(id, request);
  }

  @Get()
  list() {
    return this.editionService.listAll();
  }

  @Get(":id")
  listById(@Param('id') id: string) {
    return this.editionService.listById(id);
  }

  @Delete(":id")
  delete(@Param('id') id: string) {
    return this.editionService.delete(id);
  }
}