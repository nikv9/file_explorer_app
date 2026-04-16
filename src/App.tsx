import { Route, Routes } from "react-router-dom";
import FileExplorer from "./components/FileExplorer";

const App = () => {
  return (
    <div className="h-screen w-screen bg-[#fafafa] text-[#333333] flex flex-col font-sans overflow-hidden selection:bg-blue-100">
      <header className="flex flex-shrink-0 items-center px-5 h-14 bg-white border-b border-gray-200 shadow-sm z-10 w-full relative">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-400"></div>
          <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
          <div className="w-4 h-4 rounded-full bg-green-400"></div>
        </div>
        <h1 className="absolute left-1/2 -translate-x-1/2 font-semibold text-[15px] tracking-wide text-gray-800">
          File Explorer
        </h1>
      </header>
      
      <main className="flex-1 flex overflow-hidden w-full relative">
        <Routes>
          <Route path="/" element={<FileExplorer />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;