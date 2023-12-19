const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState<any>()


  console.log(message)
  const {data: session} = useSession();
const userid = session?.user?.name
const recieverId = 'a'
  useEffect(() => {
    const socket = io('http://localhost:3001');
      // Set up socket event listenwers
      socket.on('chat message', (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
        console.log('yea')
      });

      setSocket(socket)
      return () => {
        socket.disconnect();
      };
    }, []);
  

    const sendMessage = async (e) => {
      e.preventDefault()
      socket.emit('chat message', message); 

      try{ 
        const res = await fetch('/api/message',{
          
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userid,message,recieverId
          })
      })
      }
      catch{
        console.log('error during msg')
      };

    }