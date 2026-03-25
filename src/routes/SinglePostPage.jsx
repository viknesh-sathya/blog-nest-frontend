import { Link, useParams } from 'react-router-dom';
import { Image } from './../components/Image';
import { PostMenuActios } from '../components/PostMenuActions';
import { Search } from '../components/Search';
import { Comments } from '../components/Comments';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { format } from 'timeago.js';
import DOMPurify from 'dompurify';

//purify
function transformVideos(html) {
  return html.replace(
    /<a href="([^"]+\.mp4)"[^>]*>[^<]*<\/a>/g,
    '<video controls src="$1" class="w-full max-w-lg mx-auto rounded-lg mb-3"></video>',
  );
}
const fetchPost = async (slug) => {
  const res = await axios({
    method: 'GET',
    url: `${import.meta.env.VITE_API_URL}/api/v1/posts/${slug}`,
  });
  return res.data;
};

export const SinglePostPage = () => {
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return 'Loading...';
  if (error) return 'Something went very wrong bro' + error.message;
  if (!data.post) return 'Post not found';

  return (
    <div className="flex flex-col gap-8">
      {/* detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.post.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm flex-wrap">
            <span>Written by</span>
            <Link className="text-blue-800">{data.post.user.username}</Link>
            <span>on</span>
            <Link className="text-blue-800">{data.post.category}</Link>
            <span>{format(data.post.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium">{data.post.desc}</p>
        </div>
        {data.post.img && (
          <div className="hidden lg:block w-2/5">
            <Image src={data.post.img} w="600" className="rounded-2xl" />
          </div>
        )}
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-8 justify-between">
        {/* text */}
        <div className="w-full md:w-4/5 lg:w-4/5 flex flex-col gap-6 text-justify lg:text-lg">
          <div
            className="post-content"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(transformVideos(data.post.content)),
            }}
          />
        </div>
        {/* menu */}
        <div className="w-full md:w-1/5 lg:w-1/5 px-4 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8">
              <img
                src={data.post.user.img}
                className="w-12 h-12 rounded-full object-cover"
              />
              <Link
                className="text-blue-800"
                to={`/posts?author=${data.post.user.username}`}
              >
                {data.post.user.username}
              </Link>
            </div>
            <p className="text-sm text-gray-500">{data.post.user.bio}</p>
            <div className="flex gap-2">
              <Link>
                <Image src="facebook.svg" />
              </Link>
              <Link>
                <Image src="instagram.svg" />
              </Link>
            </div>
          </div>
          <PostMenuActios post={data.post} />
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="underline text-blue-800" to="/posts?cat=general">
              All
            </Link>
            <Link
              className="underline text-blue-800"
              to="/posts?cat=technology"
            >
              Technology
            </Link>
            <Link className="underline text-blue-800" to="/posts?cat=career">
              Career
            </Link>
            <Link className="underline text-blue-800" to="/posts?cat=life">
              Life
            </Link>
            <Link
              className="underline text-blue-800"
              to="/posts?cat=entertainment"
            >
              Entertainment
            </Link>
            <Link className="underline text-blue-800" to="/posts?cat=trends">
              Trends
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
      <Comments postId={data.post._id} />
    </div>
  );
};
