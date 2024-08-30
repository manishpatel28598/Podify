import React, { useState } from "react";
import "./style.css";

function FileInput({ accept, id, fileHandleFnc, text }) {
  const [fileSelected, setFileSelected] = useState("");

  const onChange = (e) => {
    console.log(e.target.files);
    setFileSelected(e.target.files[0].name);
    fileHandleFnc(e.target.files[0]);
  };

  return (
    <>
      {/* <div className="custom-input1"> */}
      <label className={`custom-input1 ${fileSelected && "label-input Active"}`} htmlFor={id}>
        {fileSelected ? `The File ${fileSelected} Selected` : text}
      </label>
      <input
        type="file"
        accept={accept}
        id={id}
        style={{ display: "none" }}
        onChange={onChange}
      />
      {/* </div> */}
    </>
  );
}

export default FileInput;
