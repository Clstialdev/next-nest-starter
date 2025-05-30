import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DRIZZLE } from '../drizzle/drizzle.module';
import { DrizzleDB } from '@shared/drizzle';
import { schema } from '@shared/drizzle';
import { eq } from '@shared/drizzle/operators';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createUserDto: CreateUserDto) {
    return await this.db.insert(schema.users).values(createUserDto).returning();
  }

  async findAll() {
    return await this.db.select().from(schema.users);
  }

  async findOne(id: number) {
    return await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id));
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.db
      .update(schema.users)
      .set(updateUserDto)
      .where(eq(schema.users.id, id))
      .returning();
  }

  async remove(id: number) {
    return await this.db
      .delete(schema.users)
      .where(eq(schema.users.id, id))
      .returning();
  }
}
