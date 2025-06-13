import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DRIZZLE } from '../drizzle/drizzle.module';
import { DrizzleDB } from '@shared/drizzle';
import { schema } from '@shared/drizzle';
import { eq } from '@shared/drizzle/operators';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createUserDto: CreateUserDto) {
    // Hash the password before storing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    const userToCreate = {
      ...createUserDto,
      password: hashedPassword,
    };

    return await this.db.insert(schema.users).values(userToCreate).returning();
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

  async findOneByEmail(email: string) {
    return await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email));
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // Hash password if it's being updated
    const dataToUpdate = { ...updateUserDto };
    if (updateUserDto.password) {
      const saltRounds = 10;
      dataToUpdate.password = await bcrypt.hash(
        updateUserDto.password,
        saltRounds,
      );
    }

    return await this.db
      .update(schema.users)
      .set(dataToUpdate)
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
