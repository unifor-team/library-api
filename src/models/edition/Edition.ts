import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';


export class Edition {
    public id: string;
    public genre: string;
    public page: number;
    public isbn10: string;
    public isbn13: string;
    public publisher: string;
    public year_of_publication: Date;
    

    constructor(
        genre: string,
        page: number,
        publisher: string,
        isbn10: string,
        isbn13: string,
    ) {
        this.id = randomUUID();
        this.genre = genre;
        this.page = page;
        this.publisher = publisher;
        this.isbn10 = isbn10;
        this.isbn13 = isbn13;
        this.year_of_publication = new Date;
        

    }

    public static async build(
        genre: string,
        page: number,
        publisher: string,
        isbn10: string,
        isbn13: string,
    ): Promise<Edition> {
      return new Edition(genre, page, publisher, isbn10,isbn13);
    }

    public set identifier(id: string) {
        if (!id) throw new Error('Id is empty.');
        this.id = id;
      }
}
