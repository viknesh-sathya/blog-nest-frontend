import { Link } from 'react-router-dom';
import { Image } from './Image';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { format } from 'timeago.js';

const fetchPost = async () => {
  const res = await axios({
    method: 'GET',
    url: `${import.meta.env.VITE_API_URL}/api/v1/posts?featured=true&limit=4&sort=newest`,
  });
  return res.data;
};

export const FeaturedPosts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['featuredPost'],
    queryFn: () => fetchPost(),
  });

  if (isPending) return 'Loading...';
  if (error) return 'Something went very wrong bro' + error.message;

  const featuredPosts = data.posts;
  if (!featuredPosts || featuredPosts.length === 0) return;

  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8 ">
      {/* FIRST POST */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {featuredPosts[0].img && (
          <Image
            src={featuredPosts[0].img}
            className="rounded-3xl object-cover w-full h-full"
            w="895"
          />
        )}
        <div className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <span className="text-blue-800 lg:text-lg">
            {featuredPosts[0].category}
          </span>
          <span className="text-gray-500">
            {format(featuredPosts[0].createdAt)}
          </span>
        </div>
        <Link
          to={featuredPosts[0].slug}
          className="text-xl lg:text-3xl font-semibold lg:font-bold underline"
        >
          {featuredPosts[0].title}
        </Link>
      </div>
      {/* OTHER POST */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* 2nd */}
        {featuredPosts[1] && (
          <div className="lg:h-1/3 flex justify-between gap-4">
            <div className="w-1/3 aspect-video">
              {featuredPosts[1].img && (
                <Image
                  src={featuredPosts[1].img}
                  className="rounded-3xl object-cover  w-full h-full"
                  w="298"
                />
              )}
            </div>
            <div className="w-2/3">
              <div className=" flex items-center gap-4 text-sm lg:text-base mb-4">
                <h1 className="font-semibold lg:text-lg">02.</h1>
                <span className="text-blue-800 lg:text-lg">
                  {featuredPosts[1].category}
                </span>
                <span className="text-gray-500 text-sm">
                  {format(featuredPosts[1].createdAt)}
                </span>
              </div>
              <Link
                to={featuredPosts[1].slug}
                className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium underline"
              >
                {featuredPosts[1].title}
              </Link>
            </div>
          </div>
        )}
        {/* 3rd */}
        {featuredPosts[2] && (
          <div className="lg:h-1/3 flex justify-between gap-4">
            <div className="w-1/3 aspect-video">
              {featuredPosts[2].img && (
                <Image
                  src={featuredPosts[2].img}
                  className="rounded-3xl object-cover  w-full h-full"
                  w="298"
                />
              )}
            </div>
            <div className="w-2/3">
              <div className=" flex items-center gap-4 text-sm lg:text-base mb-4">
                <h1 className="font-semibold lg:text-lg">03.</h1>
                <span className="text-blue-800 lg:text-lg">
                  {featuredPosts[2].category}
                </span>
                <span className="text-gray-500 text-sm">
                  {format(featuredPosts[2].createdAt)}
                </span>
              </div>
              <Link
                to={featuredPosts[2].slug}
                className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium underline"
              >
                {featuredPosts[2].title}
              </Link>
            </div>
          </div>
        )}
        {/* 4th */}
        {featuredPosts[3] && (
          <div className="lg:h-1/3 flex justify-between gap-4">
            <div className="w-1/3 aspect-video">
              {featuredPosts[3].img && (
                <Image
                  src={featuredPosts[3].img}
                  className="rounded-3xl object-cover w-full h-full"
                  w="298"
                />
              )}
            </div>
            <div className="w-2/3">
              <div className=" flex items-center gap-4 text-sm lg:text-base mb-4">
                <h1 className="font-semibold lg:text-lg">04.</h1>
                <span className="text-blue-800 lg:text-lg">
                  {featuredPosts[3].category}
                </span>
                <span className="text-gray-500 text-sm">
                  {format(featuredPosts[3].createdAt)}
                </span>
              </div>
              <Link
                to={featuredPosts[3].slug}
                className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium underline"
              >
                {featuredPosts[3].title}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
