import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { XCircleIcon } from '@heroicons/react/solid'; // Import XCircleIcon from Heroicons

const CreatePost = ({ onDataChange, setEventTrigger, showCreatePost, setShowCreatePost }) => {
  const [message, setMessage] = useState('');
  const { data: session } = useSession();
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | ArrayBuffer | null>(null);

  const handleFile = (e) => {
    const image = e.target.files[0];
    if (image) {
      setFile(image);
      const reader = new FileReader();
      reader.onloadend = () => {
        
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(image);
    }

  };

  const handleRemoveImage = () => {
    const fileInputElement = document.getElementById("fileInput");

    if (fileInputElement instanceof HTMLInputElement) {
        fileInputElement.value = "";
        setFile(null);
        setImagePreviewUrl(null);
    }
};

  const userid = session?.user?.id as string;
  const username = session?.user?.name as string;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowCreatePost(false);
    try {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      }
      formData.append('userid', userid);
      formData.append('username', username);
      formData.append('message', message);

      const res = await axios.post('/api/updatePost', formData);

      if (res.status === 200 || res.status === 201) {
        onDataChange(message);
        setMessage('');
        setFile(null);
        setImagePreviewUrl(null);
      }
    } catch (error) {
      console.log('error during post: ', error);
    }
  };

  return (
    <div className="p-6">
      <div className={`${showCreatePost ? 'md:flex' : 'hidden'} lg:w-full fixed lg:flex inset-0 z-10 bg-white dark:bg-gray-900 md:relative md:inset-auto lg:w-full md:mx-auto shadow-lg rounded-lg overflow-hidden`}>
        <form onSubmit={handleSubmit} className="w-full h-full md:h-auto flex flex-col justify-center items-center p-4 space-y-4">
          <textarea
            className="resize-none w-full h-40 md:h-48 p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg dark:text-slate-300 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            placeholder="Share your thoughts..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></textarea>
          
          <div className="flex items-center w-full">
            <label htmlFor="fileInput" className="flex items-center cursor-pointer space-x-2">
              <div className="flex flex-column items-center">
                <img src="/icons/uploadimageicon.svg" alt="Upload" className="h-6 w-6 dark:invert dark:contrast-50"/>
                <span className="ml-2 text-indigo-500 hover:text-indigo-600">Add Image</span>
            
              </div>
            </label>
            {imagePreviewUrl && (
                  <div className="relative ml-4">
                    <img src={imagePreviewUrl as string} alt="Preview" className="w-12 h-12 object-cover rounded-lg"/>
                    <button 
                      onClick={handleRemoveImage} 
                      className="absolute -top-2 -right-2 bg-white rounded-full p-1 dark:bg-gray-900 dark:text-gray-300 "
                    >
                      <XCircleIcon className="h-6 w-6 text-red-500" />
                    </button>
                  </div>
                )} 
            <input type="file" id="fileInput" className="hidden" onChange={handleFile} />
            <button type="submit" className="bg-indigo-500 text-white px-6 absolute right-0 mr-5 py-2 rounded-md hover:bg-indigo-600 transition-colors">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
