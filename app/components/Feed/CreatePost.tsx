import { useState } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"

const CreatePost = ({ onDataChange, setEventTrigger }) => {
  const [message, setMessage] = useState('')
  const { data: session } = useSession();
  const [file, setFile] = useState(null)
  const[number, setNumber] = useState(0)
  const handleFile = async (e) => {
    const image = e.target.files[0]
    setFile(image)
  }

  const userid = session?.user?.id as string
  const username = session?.user?.name as string
  const handleSubmit = async (e) => {
    e.preventDefault()
   

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

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-5 dark:text-slate-300 dark:bg-gray-900">
      <form onSubmit={handleSubmit}>
        <textarea
          className=" resize-none w-full h-32 p-3 border border-gray-200 dark:border-gray-600 rounded-t-lg dark:text-slate-300 dark:bg-gray-900 focus:outline-none focus:border-indigo-500"
          placeholder="Share your thoughts..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        ></textarea>
        <div className="flex justify-between items-center pt-2">
          <div>
            <label htmlFor="fileInput" className="cursor-pointer">
              <img src="/icons/uploadimageicon.svg" alt="Upload" className="h-6 w-6 inline-block mr-2 dark:invert dark:contrast-50"/>
              <span className="text-sm text-indigo-500 hover:text-indigo-600">Add Image</span>
            </label>
            <input type="file" id="fileInput" className="hidden" onChange={handleFile} />
          </div>
          <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
            Post
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost;
