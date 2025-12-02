import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CommentPostInput {
  @Field()
  postId: string;

  @Field()
  authorId: string;

  @Field()
  content: string;
}
