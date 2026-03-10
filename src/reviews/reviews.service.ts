import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createReviewDto: Prisma.ReviewUncheckedCreateInput) {
    return this.databaseService.review.create({
      data: createReviewDto,
    });
  }

  async findAll() {
    return this.databaseService.review.findMany({});
  }

  async findOne(id: number) {
    return this.databaseService.review.findUnique({
      where: { id },
      include: { product: true },
    });
  }

  async update(id: number, updateReviewDto: Prisma.ReviewUncheckedUpdateInput) {
    return this.databaseService.review.update({
      where: { id },
      data: updateReviewDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.review.delete({
      where: { id },
    });
  }
}
