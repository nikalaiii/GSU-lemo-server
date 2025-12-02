# API Documentation

## Posts

### Queries

#### `getPosts`
- **Description**: Retrieves a list of all posts.
- **Type**: Query
- **Response**: An array of post objects.

#### `getPost(id: ID!)`
- **Description**: Retrieves a single post by its ID.
- **Type**: Query
- **Parameters**:
  - `id`: The ID of the post to retrieve.
- **Response**: A post object.

### Mutations

#### `createPost(title: String!, content: String!)`
- **Description**: Creates a new post.
- **Type**: Mutation
- **Parameters**:
  - `title`: The title of the post.
  - `content`: The content of the post.
- **Response**: The created post object.

#### `deletePost(id: ID!)`
- **Description**: Deletes a post by its ID.
- **Type**: Mutation
- **Parameters**:
  - `id`: The ID of the post to delete.
- **Response**: A confirmation message.

## Users

### Queries

#### `getUsers`
- **Description**: Retrieves a list of all users.
- **Type**: Query
- **Response**: An array of user objects.

#### `getUser(id: ID!)`
- **Description**: Retrieves a single user by their ID.
- **Type**: Query
- **Parameters**:
  - `id`: The ID of the user to retrieve.
- **Response**: A user object.

### Mutations

#### `createUser(username: String!, password: String!)`
- **Description**: Creates a new user.
- **Type**: Mutation
- **Parameters**:
  - `username`: The username of the user.
  - `password`: The password of the user.
- **Response**: The created user object.

#### `deleteUser(id: ID!)`
- **Description**: Deletes a user by their ID.
- **Type**: Mutation
- **Parameters**:
  - `id`: The ID of the user to delete.
- **Response**: A confirmation message.

## Authentication

### Mutations

#### `login(username: String!, password: String!)`
- **Description**: Authenticates a user and returns a JWT token.
- **Type**: Mutation
- **Parameters**:
  - `username`: The username of the user.
  - `password`: The password of the user.
- **Response**: A JWT token.

## Notes
- All endpoints are protected by JWT authentication where applicable.
- Ensure to handle errors and edge cases in your implementation.