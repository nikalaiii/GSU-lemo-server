import { ObjectType, Field } from '@nestjs/graphql';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar?: string;

  @Field()
  @Column()
  email: string;

  // Comments written by this user (as author)
  @OneToMany(() => Comment, (comment) => comment.author)
  @Field(() => [Comment], { nullable: true })
  comments: Comment[];

  // Posts created by this user
  @OneToMany(() => Post, (post) => post.author)
  @Field(() => [Post], { nullable: true })
  posts: Post[];
}
