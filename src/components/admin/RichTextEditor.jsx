import React, { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["blockquote", "code-block"],
      ["clean"],
    ],
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "align",
  "link",
  "image",
  "video",
  "blockquote",
  "code-block"
];

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const editorModules = useMemo(() => modules, []);

  return (
    <div className="rich-text-editor w-full">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={editorModules}
        formats={formats}
        placeholder={placeholder || "Start writing..."}
      />
    </div>
  );
};

export default RichTextEditor;
