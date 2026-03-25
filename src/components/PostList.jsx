import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { PostListItem } from './PostListItem';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

const fetchPosts = async (pageParam, searchParams) => {
  const searchParamsObj = Object.fromEntries(searchParams);

  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/posts`, {
    params: { page: pageParam, limit: 10, ...searchParamsObj },
  });
  return res.data;
};

export const PostList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsKey = useMemo(() => searchParams.toString(), [searchParams]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts', searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
  });

  if (status === 'pending') return 'Loading...';
  if (status === 'error') return 'Something went wrong';

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  return (
    <div id="scrollableDiv" className="h-[80vh] overflow-auto">
      <InfiniteScroll
        dataLength={allPosts.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading more posts...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>➖No more posts➖</b>
          </p>
        }
        scrollableTarget="scrollableDiv"
      >
        {allPosts.map((post) => (
          <PostListItem key={post.slug} post={post} />
        ))}
      </InfiniteScroll>
    </div>
  );
};
