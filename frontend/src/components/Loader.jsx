import { useEffect, useState } from "react";
import { setGlobalLoadingHandler } from "../utils/promeiseTrackerLoader/promiseTracker";

export default function GlobalLoader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setGlobalLoadingHandler(setLoading);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-transparent">
      
      <div className="absolute inset-0 bg-transparent pointer-events-auto" />

      {/* Spinner on top */}
      <div className="relative z-10">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-lg" />
      </div>
    </div>
  );
}
