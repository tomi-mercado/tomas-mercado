import { getPosts } from 'services/posts';

import PostListItemDate from './PostListItemDate';

const PostListItem = ({
  post,
}: {
  post: Awaited<ReturnType<typeof getPosts>>[number];
}) => {
  return (
    <div className="w-full p-6 hover:bg-secondary rounded-md">
      <p className="text-lg">{post.title}</p>
      <PostListItemDate date={post.createdAt} />
      <p className="text-sm">{post.description}</p>
    </div>
  );
};

export default PostListItem;
