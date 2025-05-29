import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DRIZZLE } from '../drizzle/drizzle.module';
import { DrizzleDB } from '../drizzle/types/drizzle';
import { users } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createUserDto: CreateUserDto) {
    return await this.db.insert(users).values(createUserDto);
  }

  async findAll() {
    return await this.db.select().from(users);
  }

  async findOne(id: number) {
    return await this.db.select().from(users).where(eq(users.id, id));
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.db
      .update(users)
      .set(updateUserDto)
      .where(eq(users.id, id));
  }

  async remove(id: number) {
    return await this.db.delete(users).where(eq(users.id, id));
  }
}
