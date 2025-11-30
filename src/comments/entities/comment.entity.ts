import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CommentContextType } from './comment-context-type.enum';

@ObjectType()
@Entity()
export class Comment {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Who left a comment
  @Field(() => String)
  @Column()
  authorId: string;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  @Field(() => User)
  author: User;

  // Who/what is the comment for (post or user)
  // Polymorphic relation: contextId + contextType
  // Note: Cannot use direct foreign key for polymorphic relations
  @Field(() => String)
  @Column()
  contextId: string; // post or user id

  @Field(() => CommentContextType)
  @Column({ type: 'enum', enum: CommentContextType })
  contextType: CommentContextType;

  @Field()
  @Column()
  content: string;
}
