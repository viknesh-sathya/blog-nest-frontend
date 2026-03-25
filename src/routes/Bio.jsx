import { useAuth } from '@clerk/clerk-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { toastStyle } from '../../utils';
export const Bio = () => {
  const { getToken } = useAuth();
  const [bioText, setBioText] = useState('');

  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();

      return await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/v1/users/bio`,
        {
          bio: bioText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
    onSuccess: () => toast.success('Bio updated Successfully', toastStyle),

    onError: (error) => toast.error(error.response.data, toastStyle),
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate();
  }

  return (
    <div className="w-full  flex flex-col items-center mt-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-center text-gray-700 font-bold text-2xl md:text-3xl lg:text-4xl mb-6">
        Say something about you
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-xl items-center"
      >
        <textarea
          name="bio"
          id="bio"
          value={bioText}
          onChange={(e) => setBioText(e.target.value)}
          className="rounded-xl w-full min-h-[120px] p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Write your bio here..."
        />

        <button
          className="bg-blue-800 text-white py-2 px-6 rounded-xl hover:bg-blue-700 transition-colors disabled:cursor-not-allowed"
          disabled={bioText.trim() == ''}
        >
          Update
        </button>

        {mutation.isPending && (
          <span className="text-gray-500 text-sm">(updating...)</span>
        )}
      </form>
    </div>
  );
};
