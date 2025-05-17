import {handleAuth} from "@/app/actions/handle-auth";

export default function Login () {
    return(
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="flex-4xl font-bold mb-10">Login</h1>
            <form
                action={handleAuth}>
                <button type="submit" className="border rounded-md px-2 ">Signin with Google</button>
            </form>
        </div>
    );
}