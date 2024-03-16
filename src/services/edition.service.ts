import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Edition } from 'src/models/edition/Edition';
import { CreateEditionDTO } from 'src/models/edition/create-dto';
import { EditEditionDTO } from 'src/models/edition/edit-dto';
import { EditionRepository } from 'src/repositories/edition/edition.prisma';

@Injectable()
export class EditionService {
  constructor(private editionRepository: EditionRepository) { }

  async create(edition: CreateEditionDTO) {
    const { genre, page, publisher, isbn10, isbn13 } = edition;
    const newEdition = await Edition.build(genre, page, publisher, isbn10, isbn13);
    return this.editionRepository.create(newEdition);
  }
  
  async update(id: string, edition: EditEditionDTO) {
    if (!id) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);

    const existedEdition = await this.editionRepository.listById(id);

    if (!existedEdition) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const { genre, page, publisher, isbn10, isbn13 } = edition;
    const updatedEdition = await Edition.build(genre, page, publisher, isbn10, isbn13);

    updatedEdition.identifier = existedEdition.id;
    updatedEdition.publisher = existedEdition.publisher;
    updatedEdition.year_of_publication = new Date();
    return this.editionRepository.update(id, updatedEdition);
  }

  async listAll() {
    return this.editionRepository.list();
  }

  async listById(id: string) {
    if (!id) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    const existedEdition = await this.editionRepository.listById(id);
    if (!existedEdition) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return existedEdition;
  }

  async delete(id: string) {
    if (!id) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    const existedEdition = await this.editionRepository.listById(id);
    if (!existedEdition) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const edition = { ...existedEdition}
    
    return this.editionRepository.delete(id);
}
}
