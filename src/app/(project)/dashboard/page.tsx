import {auth} from "@/app/lib/auth";
import {redirect} from "next/navigation";
import {handleAuth} from "@/app/actions/handle-auth";

export default async function Dashboard() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return(
      <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="flex-4xl font-bold">Protected Dashboard</h1>
          <p>{session?.user?.email ? session?.user?.email : "Usuario não esta logado"}</p>
          {
              session?.user?.email && (
                  <form
                      action={handleAuth}>
                      <button type="submit" className="border rounded-md px-2 ">Logout</button>
                  </form>
              )
          }
      </div>
    );
}