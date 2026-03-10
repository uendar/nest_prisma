/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createProductDto: Prisma.ProductCreateInput) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.databaseService.product.create({
      data: createProductDto,
    });
  }

  async findAll() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.databaseService.product.findMany({});
  }

  async findOne(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.databaseService.product.findUnique({
      where: { id },
      include: {
        description: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                id: true,
              },
            },
          },
        },
        reviews: true,
        tag: true,
      },
    });
  }

  async update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.databaseService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.databaseService.product.delete({
      where: { id },
    });
  }
}
