import HomeLists from "./components/home/HomeLists";

export default function Home() {
  return (
    <div className="w-full h-full px-4 py-6">
      <div className="w-full">
        <h1 className="text-4xl">HOME</h1>
      </div>
      <HomeLists /> 
    </div>
  );
}
