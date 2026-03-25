import { format } from 'timeago.js';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { toastStyle } from '../../utils';

export const Comment = ({ comment, postId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const role = user?.publicMetadata?.role;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      toast.success('Comment deleted successfully', toastStyle);
    },
    onError: (error) => toast.error(error.response.data, toastStyle),
  });
  function handleDeleteComment() {
    const answer = confirm('Are you sure to delete your comment?');
    if (answer) mutation.mutate();
  }
  return (
    <div className="p-4 bg-slate-50 rounded-xl">
      <div className="flex items-center gap-4">
        <img
          src={comment.user.img}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-medium">{comment.user.username}</span>
        <span className="text-sm text-gray-500">
          {format(comment.createdAt)}
        </span>
        {user &&
          (user.username === comment.user.username || role === 'admin') && (
            <span
              className="text-red-600 hover:text-red-300 text-sm ml-auto cursor-pointer font-semibold"
              onClick={handleDeleteComment}
            >
              Delete
              {mutation.isPending && (
                <span className="text-gray-500">(Deleting...)</span>
              )}
            </span>
          )}
      </div>
      <div className="mt-4">
        <p>{comment.desc}</p>
      </div>
    </div>
  );
};
