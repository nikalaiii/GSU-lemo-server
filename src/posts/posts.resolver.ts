import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create.post.input';
import { DeletePostInput } from 'src/users/dto/delete.post.input';
import { EditPostInput } from './dto/edit.post.input';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
  }

  @Query(() => [Post], { name: 'posts' })
  getAll() {
    return this.postsService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  getOne(@Args('id', { type: () => String }) id: string) {
    return this.postsService.findOne(id);
  }

  @Mutation(() => String, { name: 'removePost' })
  removePost(@Args('deletePostInput') deletePostInput: DeletePostInput) {
    return this.postsService.removePost(
      deletePostInput.postId,
      deletePostInput.userId,
    );
  }

  @Mutation(() => Post, { name: 'likePost' })
  likePost(@Args('postId') postId: string, @Args('userId') userId: string) {
    return this.postsService.likePost(postId, userId);
  }

  @Mutation(() => Post, { name: 'editPost' })
  editPost(@Args('editPostInput') editPostInput: EditPostInput) {
    return this.postsService.editPost(
      editPostInput.postId,
      editPostInput.userId,
      { title: editPostInput.title, content: editPostInput.content },
    );
  }
}
