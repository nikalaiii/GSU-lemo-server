import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { WriteCommentUserInput } from './dto/write.comment.input';
import { CommentsService } from 'src/comments/comments.service';
import { CommentContextType } from 'src/comments/entities/comment-context-type.enum';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    private readonly commentsService: CommentsService,
  ) {}
  create(createUserInput: CreateUserInput) {
    const newUser = {
      ...createUserInput,
      comments: [],
      posts: [],
    };

    const created = this.usersRepo.create(newUser);
    return this.usersRepo.save(created);
  }

  async findAll() {
    return this.usersRepo.find();
  }

  async findOne(id: string) {
    return this.usersRepo.findOneBy({ id });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const userToUpdate = await this.usersRepo.findOneBy({ id });

    if (!userToUpdate) {
      throw new NotFoundException('user not found');
    }

    Object.assign(userToUpdate, updateUserInput);

    return this.usersRepo.save(userToUpdate);
  }

  async remove(id: string) {
    return this.usersRepo.delete({ id });
  }

  async addComment(commentData: WriteCommentUserInput) {
    const { userId, authorId, content } = commentData;

    if (userId === authorId) {
      throw new BadRequestException("you can't write a comment for yourself");
    }

    const userToComment = await this.usersRepo.findOneBy({ id: userId });

    if (!userToComment) {
      throw new NotFoundException('user not found');
    }

    return this.commentsService.create({
      authorId,
      content,
      contextId: userId,
      contextType: CommentContextType.USER,
    });
  }
}
