import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { bcrypt } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      // const saltOrRounds = 10;
      // const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
      const userDataTable = {
        email: createUserDto.email,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        password: createUserDto.password,
        phone: createUserDto.phone,
        workPhone: createUserDto.workPhone,
        jobTitle: createUserDto.jobTitle,
      };
      // if (response) {
      const user = await this.prisma.user.create({ data: userDataTable });
      if (user) {
        await this.prisma.userAddress.create({
          data: {
            state: createUserDto.address.state,
            city: createUserDto.address.city,
            address: createUserDto.address.address,
            country: createUserDto.address.country,
            zip: createUserDto.address.zip,
            userId: user.id,
          },
        });
        const checkCompany = await this.prisma.company.findUnique({
          where: {
            name: createUserDto.company.companyName.toLowerCase(),
          },
        });
        let createCompany;
        if (!checkCompany) {
          createCompany = await this.prisma.company.create({
            data: { name: createUserDto.company.companyName.toLowerCase() },
          });
        }

        await this.prisma.userCompany.create({
          data: {
            companyId: createCompany ? createCompany.id : checkCompany.id,
            userId: user.id,
          },
        });
        return user;
      }
    } catch (error) {
      console.log('asadadsd', error);
      let message: string;
      console.log(message);
      if (error.meta && error.meta.target[0] === 'email')
        message = `Email already exist`;
      throw new HttpException(
        message !== undefined
          ? message
          : `Something went wrong! Please fill all required fields`,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number): Promise<any> {
    return this.prisma.user.findUnique({ where: { id: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    return this.prisma.user.update({
      where: { id: id },
      data: { refreshToken: updateUserDto.refreshToken },
    });
  }

  remove(id: number): Promise<any> {
    return this.prisma.user.delete({ where: { id: id } });
  }

  async findByEmail(email: string): Promise<any> {
    return this.prisma.user.findUnique({ where: { email: email } });
  }

  async findById(userId: number): Promise<any> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }
}
