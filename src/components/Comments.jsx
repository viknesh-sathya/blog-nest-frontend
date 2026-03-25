import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Comment } from './Comment';
import axios from 'axios';
import { toast } from 'react-toastify';
import { toastStyle } from '../../utils';

const fetchComments = async (postId) => {
  const res = await axios({
    method: 'GET',
    url: `${import.meta.env.VITE_API_URL}/api/v1/comments/${postId}`,
  });
  return res.data.comments;
};

export const Comments = ({ postId }) => {
  const { getToken } = useAuth();
  const user = useUser();

  const { isPending, error, data } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const token = await getToken();

      return await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/comments/${postId}`,

        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
    onError: (error) => toast.error(error.response.data, toastStyle),
  });

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      desc: formData.get('desc'),
    };
    mutation.mutate(data);
  }
  return (
    <div className="flex flex-col gap-8 lg:w-3/5 mb-4">
      <h1 className="text-xl text-gray-500 underline">Comments</h1>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between gap-8 w-full"
      >
        <textarea
          id="comments"
          placeholder="Write a comment..."
          name="desc"
          className="w-full p-4 rounded-xl min-h-8 outline-blue-800"
        />
        <button className="bg-blue-800 px-4 py-3 text-white font-medium rounded-xl">
          Send
        </button>
      </form>
      {isPending ? (
        'Loading...'
      ) : error ? (
        'Error loading comments😪'
      ) : (
        <>
          {mutation.isPending && (
            <Comment
              //here the variable is the newComment
              comment={{
                desc: `${mutation.variables.desc} (Sending...)`,
                createdAt: new Date(),
                user: {
                  img: user.imageUrl,
                  username: user.username,
                },
              }}
            />
          )}
          {data.map((comment) => (
            <Comment key={comment._id} comment={comment} postId={postId} />
          ))}
        </>
      )}
    </div>
  );
};
