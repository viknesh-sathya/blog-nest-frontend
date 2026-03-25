import { Link } from 'react-router-dom';
import { Image } from './Image';
import { format } from 'timeago.js';

export const PostListItem = ({ post }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-8">
      {/* image */}

      <div className="md:hidden xl:block xl:w-1/3 2xl:w-1/3">
        {post.img && (
          <Image src={post.img} className="rounded-2xl object-cover" w="735" />
        )}
      </div>
      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3 2xl:w-2/3">
        <Link to={`/${post.slug}`} className="text-4xl font-semibold">
          {post.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm flex-wrap">
          <span>Written by</span>
          <Link
            to={`/posts?author=${post.user.username}`}
            className="text-blue-800"
          >
            {post.user.username}
          </Link>
          <span>on</span>
          <Link to={`/posts?cat=${post.category}`} className="text-blue-800">
            {post.category}
          </Link>
          <span className="text-gray-500">{format(post.createdAt)}</span>
        </div>
        <p>{post.desc}</p>
        <Link to={`/${post.slug}`} className="underline text-blue-800">
          Read More
        </Link>
      </div>
    </div>
  );
};
