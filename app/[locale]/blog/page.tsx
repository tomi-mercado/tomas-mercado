import LinkMantainLocale from 'components/LinkMantainLocale';
import { getPosts } from 'services/posts';

const Blog = async () => {
  const posts = await getPosts();

  return (
    <div className="container">
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <LinkMantainLocale href={`/blog/${post.slug}`}>
              {post.title}
            </LinkMantainLocale>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
