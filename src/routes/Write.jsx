import { useAuth, useUser } from '@clerk/clerk-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toastStyle } from '../../utils';
import { Upload } from '../components/Upload';

export const Write = () => {
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();

  const [value, setValue] = useState(''); //reactquil content
  const [progress, setProgress] = useState(0);
  const [cover, setCover] = useState(''); //cover image
  const [img, setImg] = useState('');
  const [video, setVideo] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    img && setValue((prev) => prev + `<p><img src="${img.url}"/></p>`);
  }, [img]);
  useEffect(() => {
    video &&
      setValue(
        (prev) =>
          prev + `<p><iframe class="ql-video" src="${video.url}"></iframe></p>`,
      );
  }, [video]);

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();

      return await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/posts`,

        newPost,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
    onSuccess: (res) => {
      toast.success('Your post is now live!', toastStyle);
      navigate(`/${res.data.post.slug}`);
    },
  });

  if (!isLoaded) {
    return <div className="">Loading...</div>;
  }
  if (isLoaded && !isSignedIn) {
    return <div className="">You should login</div>;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      img: cover.filePath || '',
      title: formData.get('title'),
      category: formData.get('category'),
      desc: formData.get('desc'),
      content: value,
    };
    mutation.mutate(data);
  }

  return (
    <div className="md:h-[calc(100vh-80px)] h-[calc(100vh-64px)] flex flex-col gap-6">
      <h1 className="text-xl font-light">Create a new post</h1>
      <form onSubmit={handleSubmit} className="flex flex-1 mb-6 flex-col gap-6">
        <Upload type="image" setProgress={setProgress} setData={setCover}>
          <button className="p-2 shadow-md rounded-xl text-gray-500 bg-white w-max ">
            Add a crazy cover image
          </button>
        </Upload>

        <input
          type="text"
          id="write-post"
          name="title"
          placeholder="Title goes here..."
          className="text-4xl font-semibold bg-transparent outline-none"
        />
        <div className="flex items-center gap-4">
          <label htmlFor="cat" className="text-sm">
            Choose a category:
          </label>
          <select
            name="category"
            id="cat"
            className="p-2 rounded-xl bg-white shadow-md"
          >
            <option value="general">General</option>
            <option value="technology">Technology</option>
            <option value="career">Career</option>
            <option value="life">Life</option>
            <option value="entertainment">Entertainment</option>
            <option value="trends">Trends</option>
          </select>
        </div>
        <textarea
          className="p-4 rounded-xl bg-white shadow-md"
          name="desc"
          id="desc"
          placeholder="A short description"
        />
        <div className="flex flex-1 gap-2">
          <div className="flex flex-col gap-2">
            <Upload type="image" setProgress={setProgress} setData={setImg}>
              📸
            </Upload>
            <Upload type="video" setProgress={setProgress} setData={setVideo}>
              🎦
            </Upload>
          </div>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            readOnly={progress > 0 && progress < 100}
            className="flex-1 rounded-xl bg-white shadow-md read-only:cur"
          />
        </div>

        <button
          disabled={mutation.isPending || (progress > 0 && progress < 100)}
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 mb-6 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? 'Posting...' : 'Post'}
        </button>
        {progress > 0 && (
          <span
            className={`${progress === 100 ? 'text-green-600' : 'text-red-600'} font-semibold`}
          >{`Progess : ${progress}%`}</span>
        )}
        {mutation.isError && (
          <span className="text-rose-600 font-semibold">
            {'Something went wrong, but dont worry, try after sometime 😊'}
          </span>
        )}
      </form>
    </div>
  );
};
