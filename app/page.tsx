// import prisma from '@/lib/prisma'
import HomeLists from "./components/home/HomeLists";

export default function Home() {

  const isLoggedIn = (): boolean => {

    return false;
  }

  return (
    <div className="w-full h-full px-4 py-6">
      <div className="w-full">
        <h1 className="text-2xl">HOMES</h1>
      </div>
      {isLoggedIn() ? (
        <HomeLists /> 
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-2xl">Please login to view your homes</h1>
        </div>
      )}
    </div>
  );
}
