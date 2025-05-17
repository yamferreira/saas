import Link from "next/link";

export default function Home() {
  return(
      <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Landing Page</h1>
            <Link href={"/login"}>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >Login</button>
            </Link>
          </div>
  );
}
