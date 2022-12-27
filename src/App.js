import { useState, useEffect } from 'react';
import md from 'markdown-it';
import './App.css';

function App() {
  const [value, setValue] = useState(() => {
    const saveValue = window.localStorage.getItem('value');
    console.log(saveValue);
    if (saveValue !== null) {
      return saveValue;
    }
    else {
      return '';
    }
  });

  useEffect(() => {
    window.localStorage.setItem('value', value);
  }, [value]);


  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className='text-3xl font-bold m-5 text-center'>Markdown Editor</h1>
      <div className='flex gap-5'>
        <textarea className='border-2 border-neutral-700 rounded-md p-5'cols='60' rows='30' value={value} onInput={(e) => setValue(e.target.value)} placeholder='start by typing here...'></textarea>
        <div className='w-[800px] h-[1000px] border-2 border-neutral-700 rounded-md p-5 prose prose-sm overflow-auto' dangerouslySetInnerHTML={{ __html: md().render(value) }}></div>
      </div>
      <button className='rounded-lg bg-blue-600 p-5 text-white mt-5 hover:bg-blue-800'>Download</button>
    </div>
  );
}

export default App;
