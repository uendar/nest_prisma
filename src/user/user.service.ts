import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(private readonly databaseService: DatabaseService) { }

  async create(createUserDto: Prisma.UserUncheckedCreateInput) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.databaseService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  findAll() {
    return this.databaseService.user.findMany();
  }

  findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: number, updateUserDto: Prisma.UserUncheckedUpdateInput) {
    if (updateUserDto.password && typeof updateUserDto.password === 'string') {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    return this.databaseService.user.update({
      where: {
        id
      },
      data: updateUserDto
    });
  }

  remove(id: number) {
    return this.databaseService.user.delete({
      where: {
        id
      }
    });
  }
}
