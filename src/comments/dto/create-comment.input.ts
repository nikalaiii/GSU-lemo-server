import { InputType, Field } from '@nestjs/graphql';
import { CommentContextType } from '../entities/comment-context-type.enum';

@InputType()
export class CreateCommentInput {
  @Field()
  authorId: string;

  @Field()
  content: string;

  @Field()
  contextId: string; // post or user id

  @Field(() => CommentContextType)
  contextType: CommentContextType;
}
