import LoginForm from "./components/Forms/LoginForm"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await getServerSession(authOptions)

  if(session) redirect ("/dashboard")

  return (
   <main>
    <LoginForm/>
   </main>
  )
}
