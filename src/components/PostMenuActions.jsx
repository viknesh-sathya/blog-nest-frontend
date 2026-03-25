import { useAuth, useUser } from '@clerk/clerk-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import axios from 'axios';
import { toast } from 'react-toastify';
import { toastStyle } from '../../utils';
import { useNavigate } from 'react-router-dom';

export const PostMenuActios = ({ post }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    isPending,
    error,
    data: savedPosts,
  } = useQuery({
    queryKey: ['savedPosts'],
    queryFn: async () => {
      const token = await getToken();
      return await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/users/saved`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
  });

  const isAdmin = user?.publicMetadata?.role === 'admin' || false;

  const isSaved =
    savedPosts?.data.savedPost?.some((spId) => spId === post._id) || false;

  //SAVE/UN-SAVE POST

  const saveMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/v1/users/save`,
        {
          postId: post._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['savedPosts'],
      });
      toast.success(
        data.data.isSaved ? 'Unsaved successfully' : 'saved successfully',
      );
    },

    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  //FEATURE POST
  const featureMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return await axios({
        method: 'PATCH',
        url: `${import.meta.env.VITE_API_URL}/api/v1/posts/feature`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          postId: post._id,
        },
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['post', post.slug],
      });
      toast.success(
        data.data.post.isFeatured
          ? 'Added as Featured'
          : 'Removed from Featured',
      );
    },

    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  //DELETE POST
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/posts/${post._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
    onSuccess: () => {
      toast.success('Post deleted successfully!', toastStyle);
      navigate('/');
    },

    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  function handlesavePost() {
    if (!user) return navigate('/login');
    saveMutation.mutate();
  }
  function handleFeaturePost() {
    if (!isAdmin) {
      toast.error('Only admins can feature posts', toastStyle);
      return navigate('/login');
    }

    featureMutation.mutate();
  }
  function handleDelete() {
    const answer = confirm('Are you sure, you want to delete?');

    if (answer) deleteMutation.mutate();
  }
  return (
    <div className="mt-8 mb-4 text-sm font-medium">
      <h1>Actions</h1>
      {isPending ? (
        'Loading..'
      ) : error ? (
        'Saved post fetching failed'
      ) : (
        <div
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={handlesavePost}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20px"
            height="20px"
          >
            <path
              d="M12 4C10.3 4 9 5.3 9 7v34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z"
              stroke="black"
              strokeWidth="2"
              fill={isSaved ? 'black' : 'none'}
            />
          </svg>
          <div className="flex flex-col ">
            <span>Save this post</span>
            {saveMutation.isPending && (
              <p className="text-gray-500">(in progress...)</p>
            )}
          </div>
        </div>
      )}
      {/* Feature button */}
      {isAdmin && (
        <div
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={handleFeaturePost}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20px"
            height="20px"
          >
            <path
              d="M24 2L29.39 16.26L44 18.18L33 29.24L35.82 44L24 37L12.18 44L15 29.24L4 18.18L18.61 16.26L24 2Z"
              stroke="black"
              strokeWidth="2"
              fill={post.isFeatured ? 'black' : 'none'}
            />
          </svg>
          <span>Feature this post</span>
          {featureMutation.isPending && (
            <span className="text-gray-500 text-sm"> (progress...)</span>
          )}
        </div>
      )}
      {/* Delete */}
      {user && (post.user.username === user.username || isAdmin) && (
        <div
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={handleDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            fill="red"
            width="20px"
            height="20px"
          >
            <path d="M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 10.154297 7 A 1.0001 1.0001 0 0 0 9.984375 6.9863281 A 1.0001 1.0001 0 0 0 9.8398438 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.645455 10.354545 48 12 48 L 38 48 C 39.645455 48 41 46.645455 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 40.167969 7 A 1.0001 1.0001 0 0 0 39.841797 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 11 9 L 18.832031 9 A 1.0001 1.0001 0 0 0 19.158203 9 L 30.832031 9 A 1.0001 1.0001 0 0 0 31.158203 9 L 39 9 L 39 45 C 39 45.554545 38.554545 46 38 46 L 12 46 C 11.445455 46 11 45.554545 11 45 L 11 9 z M 18.984375 13.986328 A 1.0001 1.0001 0 0 0 18 15 L 18 40 A 1.0001 1.0001 0 1 0 20 40 L 20 15 A 1.0001 1.0001 0 0 0 18.984375 13.986328 z M 24.984375 13.986328 A 1.0001 1.0001 0 0 0 24 15 L 24 40 A 1.0001 1.0001 0 1 0 26 40 L 26 15 A 1.0001 1.0001 0 0 0 24.984375 13.986328 z M 30.984375 13.986328 A 1.0001 1.0001 0 0 0 30 15 L 30 40 A 1.0001 1.0001 0 1 0 32 40 L 32 15 A 1.0001 1.0001 0 0 0 30.984375 13.986328 z" />
          </svg>
          <span>Delete this post</span>
          {deleteMutation.isPending && (
            <span className="text-xs text-gray-500">(deleting...)</span>
          )}
        </div>
      )}
    </div>
  );
};
