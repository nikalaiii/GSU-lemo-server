import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { CommentContextType } from './entities/comment-context-type.enum';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepo: Repository<Comment>,
  ) {}

  async create(input: CreateCommentInput) {
    const comment = this.commentsRepo.create(input);
    return this.commentsRepo.save(comment);
  }

  async findAll() {
    // Load author relation when fetching all comments
    return this.commentsRepo.find({
      relations: ['author'],
    });
  }

  async findOne(id: string) {
    // Load author relation when fetching a single comment
    return this.commentsRepo.findOne({
      where: { id },
      relations: ['author'],
    });
  }

  async findForPost(postId: string) {
    // Load author relation for comments on a post
    return this.commentsRepo.find({
      where: { contextId: postId, contextType: CommentContextType.POST },
      relations: ['author'],
    });
  }

  async findForUser(userId: string) {
    // Load author relation for comments on a user
    return this.commentsRepo.find({
      where: { contextId: userId, contextType: CommentContextType.USER },
      relations: ['author'],
    });
  }

  async update(id: string, updateCommentInput: UpdateCommentInput) {
    const comment = await this.commentsRepo.findOneBy({ id });
    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
    Object.assign(comment, updateCommentInput);
    return this.commentsRepo.save(comment);
  }

  async remove(id: string) {
    const comment = await this.commentsRepo.findOneBy({ id });
    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
    await this.commentsRepo.delete({ id });
    return id;
  }
}
