import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EditPostInput {
  @Field()
  postId: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  userId: string; // в цьому контексті ми подрозумеваємо не id автора поста, а id того хто хоче редачить
}
