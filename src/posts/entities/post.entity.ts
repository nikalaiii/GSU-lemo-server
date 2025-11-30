import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@ObjectType()
@Entity()
export class Post {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  content: string;

  // Comments on this post (polymorphic - loaded via CommentsService.findForPost)
  // Note: Cannot use direct @OneToMany for polymorphic relations
  // Use CommentsService.findForPost(postId) to load comments
  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];

  // Author of the post
  @Field(() => String)
  @Column()
  authorId: string;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  @Field(() => User, { nullable: true })
  author: User;

  @Field(() => [String])
  @Column('text', { array: true, default: [] })
  likes: string[]; // запусуєм id кожного хто лайкнув
}
