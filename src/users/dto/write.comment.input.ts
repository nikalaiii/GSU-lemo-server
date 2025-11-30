import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class WriteCommentUserInput {
  @Field()
  userId: string;

  @Field()
  authorId: string;

  @Field()
  content: string;
}
