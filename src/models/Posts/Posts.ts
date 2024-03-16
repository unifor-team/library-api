import { randomUUID } from 'crypto';
import { PostStatus } from './posts-status';

export class Posts {
 public id: string;
 public title: string;
 public body: string;
 public user_id: string;
 public status: PostStatus;
 public created_at: Date;
 public updated_at: Date;
 public deleted_at: Date;

 constructor(userId: string, title: string, body: string){
    this.id = randomUUID();
    this.title = title;
    this.body = body;
    this.status = PostStatus.POSTED;
    this.created_at = new Date();
    this.user_id = userId;
 }

 public static async PostBuild(
  userId: string,
   title: string,
   body: string
   ): Promise<Posts> {
   return new Posts(userId, title, body);
 }


 public set identifier(id: string) {
  if (!id) throw new Error('Id is empty.');
  this.id = id;
}

public set updatedAt(date: Date) {
  this.updated_at = date;
}

public set deletedAt(date: Date) {
  this.deleted_at = date;
}
}