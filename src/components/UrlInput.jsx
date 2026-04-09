


import { useState } from "react";
import { useTokenStore } from "../store/useTokenStore";

export default function UrlInput() {
  const [input, setInput] = useState("");
  const { scrapeUrl, status } = useTokenStore();

  const onClick = () => {
    let finalUrl = input.trim();

    if (!finalUrl.startsWith("http")) {
      finalUrl = "https://" + finalUrl;
    }

    scrapeUrl(finalUrl);
  };

  return (
    <div className="flex items-center gap-3">
      <input
        className="w-[480px] px-4 py-2 rounded bg-white text-black"
        placeholder="Paste any website URL..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={status === "loading"}
      />
      <button
        onClick={onClick}
        className="bg-[#0a66c2] text-white px-4 py-2 rounded"
      >
        {status === "loading" ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}