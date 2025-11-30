import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create.post.input';
import { EditPostInput } from './dto/edit.post.input';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepo: Repository<Post>,
  ) {}

  async findAll() {
    // Load author relation when fetching all posts
    const allPosts = await this.postsRepo.find({
      relations: ['author'],
    });

    return allPosts;
  }

  async create(input: CreatePostInput) {
    const post = this.postsRepo.create({
      authorId: input.authorId,
      title: input.title,
      content: input.content,
      likes: [],
    });

    const savedPost = await this.postsRepo.save(post);

    // Load author relation after saving
    return this.postsRepo.findOne({
      where: { id: savedPost.id },
      relations: ['author'],
    });
  }

  async getOne(id: string) {
    // Load author relation when fetching a single post
    const foundPost = await this.postsRepo.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!foundPost) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return foundPost;
  }

  async findOne(id: string) {
    return this.getOne(id);
  }

  async removePost(postId: string, userId: string) {
    const post = await this.postsRepo.findOneBy({ id: postId });

    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }

    if (post.authorId !== userId) {
      throw new ForbiddenException('You are not the owner of this post');
    }

    await this.postsRepo.delete({ id: postId });

    return postId;
  }

  async likePost(postId: string, userId: string) {
    const post = await this.postsRepo.findOne({
      where: { id: postId },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }

    if (post.likes.includes(userId)) {
      throw new ForbiddenException('You have already liked this post');
    }

    post.likes.push(userId);

    await this.postsRepo.save(post);

    // Reload with relations
    return this.postsRepo.findOne({
      where: { id: postId },
      relations: ['author'],
    });
  }

  async editPost(
    postId: string,
    userId: string,
    data: Pick<Post, 'title' | 'content'>,
  ) {
    const post = await this.postsRepo.findOne({
      where: { id: postId },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }

    if (post.authorId !== userId) {
      throw new ForbiddenException('You are not the owner of this post');
    }

    Object.assign(post, data);

    await this.postsRepo.save(post);

    // Reload with relations
    return this.postsRepo.findOne({
      where: { id: postId },
      relations: ['author'],
    });
  }
}
