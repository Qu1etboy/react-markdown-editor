import { useState, useEffect } from "react";
import "./App.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Editor from "@monaco-editor/react";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

function App() {
  const [value, setValue] = useState(() => {
    const saveValue = window.localStorage.getItem("value");

    if (saveValue !== null) {
      return saveValue;
    } else {
      return "";
    }
  });

  useEffect(() => {
    window.localStorage.setItem("value", value);
  }, [value]);

  const handleDownload = () => {
    // create fileUrl from blob
    const blob = new Blob([value]);
    const fileUrl = URL.createObjectURL(blob);
    // create download link
    const link = document.createElement("a");
    // create file name
    link.download = "markdown.md";
    link.href = fileUrl;
    // click to download
    link.click();
  };

  return (
    <div className="min-h-screen">
      <nav className="flex justify-between items-center w-full p-5">
        <h1 className="text-3xl font-bold text-center">Markdown Editor</h1>
        <button
          className="rounded-md bg-blue-600 p-3 text-white hover:bg-blue-800"
          onClick={handleDownload}
        >
          Download
        </button>
      </nav>
      <div className="w-full flex gap-5 h-full border">
        <Editor
          height="80vh"
          defaultLangauge="markdown"
          defaultValue={value}
          onChange={(e) => setValue(e)}
          theme="light"
        />
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          className="w-full h-[80vh] border-l-2 border-gray-300 p-5 prose prose-sm overflow-scroll"
        >
          {value}
        </ReactMarkdown>
      </div>
      <footer className="text-center mt-2 text-gray-800 text-sm">
        <a href="https://github.com/qu1etboy" target="_blank" rel="noreferrer">
          @qu1etboy.
        </a>{" "}
        All right reserved.
      </footer>
    </div>
  );
}

export default App;
