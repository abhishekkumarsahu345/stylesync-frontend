import UrlInput from "./components/UrlInput";
import TokenSidebar from "./components/TokenSidebar";
import PreviewGrid from "./components/PreviewGrid";
import { useTokenStore } from "./store/useTokenStore";

export default function App() {
  const { status, exportCss } = useTokenStore();

  return (
    <div className="h-screen flex flex-col">
      
      <div className="h-[56px] bg-[#003580] flex items-center justify-between px-6 text-white">
        <h1 className="font-bold text-xl">StyleSync 🎨</h1>
        <UrlInput />
        {status === "success" && (
          <button onClick={exportCss} className="border px-4 py-2">
            Export CSS
          </button>
        )}
      </div>

      <div className="flex flex-1">
        <TokenSidebar />

        <div className="flex-1 p-8 bg-white">
          <PreviewGrid />
        </div>
      </div>
    </div>
  );
}