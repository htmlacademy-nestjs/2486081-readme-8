export const CreateCommentMessages = {
  postId: {
    invalidId: 'PostId field must be a valid id'
  },
  comment: {
    invalidFormat: 'Comment is required',
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 300',
  },
  userId: {
    invalidId: 'UserId field must be a valid id'
  }
} as const;
