import { IKContext, IKUpload } from 'imagekitio-react';
import { toast } from 'react-toastify';
import { toastStyle } from '../../utils';
import { useRef } from 'react';

// IMAGE KIT
const authenticator = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/posts/upload-auth`,
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data; // ✅ no publicKey here
    return { signature, expire, token };
  } catch (error) {
    console.error('Authentication error:', error);
    throw new Error('Authentication request failed');
  }
};

export const Upload = ({ children, type, setData, setProgress }) => {
  const refUploadEle = useRef(null);

  function handleOnUploadProgress(progress) {
    console.log('Progress:', progress);
    setProgress(Math.round((progress.loaded / progress.total) * 100));
  }
  return (
    <IKContext
      publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY} // ✅ from frontend .env
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKUpload
        useUniqueFileName
        onSuccess={(res) => {
          toast.success('Image uploaded successully', toastStyle);
          setData(res);
          setProgress(0);
        }}
        onError={() => {
          toast.error('Image upload Failed', toastStyle);
          setProgress(0);
        }}
        onUploadProgress={handleOnUploadProgress}
        className="hidden"
        ref={refUploadEle}
        accept={`${type}/*`} // img and videos
      />
      <div
        className="cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          refUploadEle.current.click();
        }}
      >
        {children}
      </div>
    </IKContext>
  );
};
