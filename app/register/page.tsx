import RegisterForm from "../components/Forms/RegisterForm"
import { authOptions } from "../lib/authOptions"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function Register(){
    const session = await getServerSession(authOptions);
    if(session) redirect('/dashboard')
    return <RegisterForm/>
}
