import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Assessment } from '@domain/Assessment/Assessment';
import { AssessmentRepository } from '@app/repositories/Assessment/Assessment';

@Injectable()
export class PrismaAssessmentRepository implements AssessmentRepository {
  constructor(private prismaService: PrismaService) {}

  async register(testimonial: Assessment): Promise<string> {
    try {
      const { assessment, testimony, userId } = testimonial.props;

      await this.prismaService.testimonial.create({
        data: {
          assessment: assessment as string,
          testimony: testimony as string,
          userId: userId as string,
        },
        select: {
          id: true,
        },
      });

      return 'Registramos seu testimony';
    } catch (error) {
      throw new Error('Erro ao registrar o testimonyo');
    }
  }

  async findAssessmentAll(): Promise<any[]> {
    const assessments = await this.prismaService.testimonial.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            photo: true,
          },
        },
      },
    });

    return assessments;
  }
}
