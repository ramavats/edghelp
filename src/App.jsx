import { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [firstPart, setFirstPart] = useState("");
  const [secondPart, setSecondPart] = useState("");
  const [firstPartCopyText, setFirstPartCopyText] = useState("Copy");
  const [secondPartCopyText, setSecondPartCopyText] = useState("Copy");

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);

    if (text.length > 37) {
      setFirstPart(text.substring(0, 38));
      setSecondPart(text.substring(38, text.length));
    } else {
      setFirstPart(text);
      setSecondPart("");
    }
    setFirstPartCopyText("Copy");
    setSecondPartCopyText("Copy");
  };

  const copyToClipboard = (text, part) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    if (part === "first") {
      setFirstPartCopyText("Copied");
      setTimeout(() => setFirstPartCopyText("Copy"), 2000);
    } else if (part === "second") {
      setSecondPartCopyText("Copied");
      setTimeout(() => setSecondPartCopyText("Copy"), 2000);
    }
  };

  return (
    <div className="App flex flex-col justify-center items-center min-h-screen bg-gray-700">
      <div className="flex flex-col justify-center items-center">
        <label className=" font-bold text-white text-3xl my-2">
          Paste your text here:
        </label>
        <textarea
          rows="4"
          cols="50"
          value={inputText}
          onChange={handleInputChange}
          className="rounded-lg"
        />
      </div>
      <div className="my-2">
        <input
          type="text"
          value={firstPart}
          placeholder="1/2"
          readOnly
          className="p-2"
        />
        <button
          className=" text-white p-2 bg-blue-500"
          onClick={() => copyToClipboard(firstPart, "first")}>
          {firstPartCopyText}
        </button>
      </div>
      <div>
        <input
          type="text"
          value={secondPart}
          placeholder="2/2"
          readOnly
          className="p-2"
        />
        <button
          className="bg-blue-500 text-white p-2"
          onClick={() => copyToClipboard(secondPart, "second")}>
          {secondPartCopyText}
        </button>
      </div>
    </div>
  );
}

export default App;
