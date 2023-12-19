import { useState } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"
const CreatePost = ({onDataChange}) =>{

    const [message, setMessage] = useState('')
const {data:session} = useSession();
const [file, setFile] = useState(null)

const handleChange = () => {
    onDataChange(message);
  };

  const handleFile = async (e) => {
    const image = e.target.files[0]
    setFile(image)
 } 
if (file != null){
const filename = file.name }
const user = session?.user?.name
    const handleSubmit = async (e) => {
        e.preventDefault()
        handleChange()

        try{ 
          const formData = new FormData()
          if(file != null){
          formData.append('file', file)
          }
          formData.append('user', user)
          formData.append('message', message)
          
        const res = await axios.post('/api/post',formData)
       
        }
        
        catch(error){
            console.log('error during post: ', error)
        
        }
    }

 
console.log(file)
    return(
        <div className="bg-violet-300">
        <form onSubmit={handleSubmit}>
        <input className="w-full h-32" placeholder="say" onChange={(e) => {setMessage(e.target.value)}}></input>
        <input type="file" onChange={handleFile}></input>
        <button type="submit">submit</button>
        </form>
    </div>
    )
}
export default CreatePost;