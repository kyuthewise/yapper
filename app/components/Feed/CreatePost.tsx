import { useState } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"

const CreatePost = ({ onDataChange, setEventTrigger, showCreatePost, setShowCreatePost}) => {
  const [message, setMessage] = useState('')
  const { data: session } = useSession();
  const [file, setFile] = useState(null)
  const[number, setNumber] = useState(0)
  const [focusPost, setFocusPost] = useState(true)
  const handleFile = async (e) => {
    const image = e.target.files[0]
    setFile(image)
  }

  const userid = session?.user?.id as string
  const username = session?.user?.name as string
  const handleSubmit = async (e) => {
    e.preventDefault()
    setShowCreatePost(false)
    try {
      const formData = new FormData()
      if (file) {
        formData.append('file', file)
      }
      formData.append('userid', userid)
      formData.append('username', username)
      formData.append('message', message)

      const res = await axios.post('/api/updatePost', formData)

      if (res.status === 200 || res.status === 201) { // Check if post was successful
        onDataChange(message); // Update the post list after confirmation
        setMessage('');
        setFile(null);
        
      }
     
    } 
    
    catch (error) {
      console.log('error during post: ', error)
    }
  }
console.log(showCreatePost)
return (
  <div className="p-6 ">
  <div className={`${showCreatePost ? 'md:flex' : 'hidden'} lg:w-full fixed lg:flex inset-0 z-10 bg-white rounded-xl dark:bg-gray-900 md:relative md:inset-auto lg:w-full space-y-3 md:space-y-4 lg:space-y-6 md:mx-auto md:mt-4 md:h-auto`}>
    <form onSubmit={handleSubmit} className="w-full h-full  md:h-auto  flex flex-col justify-center items-center p-4">
      <textarea
        className="resize-none w-full h-1/3 md:h-1/4 p-3 border-indigo-500 border lg:h-32 rounded-md dark:text-slate-300 dark:bg-gray-800 focus:border dark:border-indigo-600 focus:outline-none focus:border-indigo-400  "
        placeholder="Share your thoughts..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      ></textarea>
      <div className="flex justify-between items-center w-full pt-4">
        <label htmlFor="fileInput" className="flex items-center cursor-pointer">
          <img src="/icons/uploadimageicon.svg" alt="Upload" className="h-6 w-6 dark:invert dark:contrast-50"/>
          <span className="text-sm md:text-base text-indigo-500 hover:text-indigo-600 ml-2">Add Image</span>
        </label>
        <input type="file" id="fileInput" className="hidden" onChange={handleFile} />
        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
          Post
        </button>
      </div>
    </form>
  </div>
  </div>
)
}
export default CreatePost;
