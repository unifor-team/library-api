import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { AccountStatus } from './account-status-enum';

export class User {
  public id: string;
  public email: string;
  public password: string;
  public name: string;
  public account_status: AccountStatus;
  public created_at: Date;
  public updated_at: Date;
  public deleted_at: Date;

  constructor(
    email: string,
    password: string,
    name: string,
  ) {
    this.id = randomUUID();
    this.email = email;
    this.password = password;
    this.name = name;
    this.account_status = AccountStatus.ACTIVE;
    this.created_at = new Date();
  }

  public static async build(
    email: string,
    password: string,
    name: string,
  ): Promise<User> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return new User(email, hash, name);
  }

  public despatchPass(pass: string): Promise<boolean> {
    return bcrypt.compare(this.password, pass);
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