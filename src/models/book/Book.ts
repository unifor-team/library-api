import { randomUUID } from "crypto";

export class Book{
    public id: string;
    public title: string;
    public user_id: string;
    public publicated_at: Date;
    public edition_id: string;


    constructor(
        title: string,
        editionId: string,
        userId: string

    ){
        this.id = randomUUID();
        this.title = title;
        this.user_id = userId;
        this.publicated_at = new Date();
        this.edition_id = editionId;

    }

    public static async build(
        title: string,
        edition_id: string,
        user_id: string

    ): Promise<Book>{
        return new Book(title, edition_id, user_id);

    }
}

