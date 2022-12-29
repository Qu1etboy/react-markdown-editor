import { useState, useEffect } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Editor from "@monaco-editor/react";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import DownloadModal from "../components/DownloadModal";

function App() {
  const [value, setValue] = useState(() => {
    const saveValue = window.localStorage.getItem("value");

    if (saveValue !== null) {
      return saveValue;
    } else {
      return "";
    }
  });

  const [fileName, setFileName] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("value", value);
  }, [value]);

  const handleDownload = (e) => {
    e.preventDefault();

    if (fileName === "") {
      return;
    }

    // create fileUrl from blob
    const blob = new Blob([value]);
    const fileUrl = URL.createObjectURL(blob);
    // create download link
    const link = document.createElement("a");
    // create file name
    link.download = fileName + ".md";
    link.href = fileUrl;
    // click to download
    link.click();
  };

  return (
    <div className="min-h-screen w-full">
      <nav className="flex justify-between items-center w-full p-5">
        <h1 className="text-xl md:text-2xl font-bold text-center">
          Markdown Editor
        </h1>
        <button
          className="rounded-md bg-blue-600 text-sm p-3 text-white hover:bg-blue-800"
          onClick={() => setOpenModal(true)}
        >
          Download
        </button>
      </nav>
      {openModal && (
        <>
          <div className="w-full h-screen fixed z-20 top-0 left-0 right-0 bottom-0 p-5">
            <div className="flex flex-col justify-center items-center w-full h-full inset-0">
              <div className="flex flex-col p-5 rounded-lg bg-white w-[1024px]">
                <h1 className="text-xl font-bold">Download as Markdown file</h1>
                <form className="mt-10" onSubmit={(e) => handleDownload(e)}>
                  <label>File name</label>
                  <input
                    placeholder="File name"
                    className="border rounded-md w-full p-3 mt-3"
                    onChange={(e) => setFileName(e.target.value)}
                    required
                  />
                  <div className="flex gap-3 float-right mt-10">
                    <button
                      type="cancel"
                      className="hover:bg-red-500 hover:text-white p-3 rounded-md duration-300"
                      onClick={() => setOpenModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="p-3 rounded-md bg-green-500 text-white hover:bg-green-700 duration-300"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-10 opacity-30 bg-black"></div>
        </>
      )}
      <div className="flex flex-col lg:grid grid-cols-2 border">
        <Editor
          height="80vh"
          defaultLangauge="markdown"
          defaultValue={value}
          onChange={(e) => setValue(e)}
          theme="light"
          className="z-0"
        />
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          className="w-full h-[80vh] border-l border-gray-300 p-5 prose prose-sm max-w-none overflow-scroll"
        >
          {value}
        </ReactMarkdown>
      </div>
      <footer className="text-center mt-2 text-gray-800 text-sm mb-2">
        <a href="https://github.com/qu1etboy" target="_blank" rel="noreferrer">
          @qu1etboy.
        </a>{" "}
        All right reserved.
      </footer>
    </div>
  );
}

export default App;
