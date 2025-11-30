import { registerEnumType } from '@nestjs/graphql';

export enum CommentContextType {
  POST = 'POST',
  USER = 'USER',
}

registerEnumType(CommentContextType, {
  name: 'CommentContextType',
});

