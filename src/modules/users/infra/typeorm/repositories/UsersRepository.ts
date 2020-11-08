import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  user(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ where: { id } });

    return user;
  }

  findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async create(UserData: ICreateUserDTO): Promise<User> {
    const appointment = this.ormRepository.create(UserData);

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
