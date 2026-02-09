"use client";

/**
 * RichTextEditor Component
 *
 * A rich text editor component using react-quill.
 * This provides better React integration and handles form compatibility.
 */

import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

export interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  height?: number;
  // Ant Design Form compatibility
  status?: "error" | "warning";
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value = "",
  onChange,
  placeholder = "",
  label,
  error,
  helperText,
  className,
  disabled = false,
  readOnly = false,
  height = 200,
  status,
}) => {
  // Quill modules configuration
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["link", "image"],
        ["clean"],
      ],
    }),
    []
  );

  // Quill formats configuration
  const formats = useMemo(
    () => [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "list",
      "bullet",
      "indent",
      "align",
      "link",
      "image",
    ],
    []
  );

  // Handle change events
  const handleChange = (content: string) => {
    // Clean up empty content - treat empty paragraphs as empty strings
    const cleanContent =
      content === "<p><br></p>" || content === "<p></p>" ? "" : content;
    onChange?.(cleanContent);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div
        className={twMerge(
          "rich-text-editor rounded-lg border border-gray-300 overflow-hidden",
          (error || status === "error") && "border-red-500",
          status === "warning" && "border-yellow-500",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        style={{ minHeight: readOnly ? `unset` : `${height + 42}px` }}
      >
        <ReactQuill
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          readOnly={readOnly || disabled}
          modules={readOnly ? { toolbar: false } : modules}
          formats={formats}
          style={{
            height: readOnly ? `unset` : `${height}px`,
          }}
        />
      </div>
      {(error || helperText) && (
        <p
          className={`mt-1 text-sm ${error ? "text-red-500" : "text-gray-500"}`}
        >
          {error || helperText}
        </p>
      )}

      {/* Custom styles for ReactQuill */}
      <style jsx global>{`
        .rich-text-editor {
          border: ${readOnly ? "none" : "1px solid #e5e7eb !important"};
        }

        .rich-text-editor .ql-editor {
          font-family: inherit;
          font-size: 14px;
          line-height: 1.5;
          min-height: ${height}px;
          padding: ${readOnly ? "0" : "12px 15px"};
        }

        .rich-text-editor .ql-toolbar {
          border: none !important;
          border-bottom: 1px solid #e5e7eb !important;
          background: #fafafa;
        }

        .rich-text-editor .ql-container {
          border: none !important;
          font-family: inherit;
        }

        .rich-text-editor .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
        }

        .rich-text-editor .ql-toolbar .ql-stroke {
          fill: none;
          stroke: #6b7280;
        }

        .rich-text-editor .ql-toolbar .ql-fill {
          fill: #6b7280;
          stroke: none;
        }

        .rich-text-editor .ql-toolbar .ql-picker-label {
          color: #6b7280;
        }

        .rich-text-editor .ql-editor:focus {
          outline: none;
        }

        .rich-text-editor:focus-within {
          border-color: #8b5cf6;
          box-shadow: 0 0 0 1px #8b5cf6;
        }

        .rich-text-editor.border-red-500:focus-within {
          border-color: #ef4444;
          box-shadow: 0 0 0 1px #ef4444;
        }

        .rich-text-editor.border-yellow-500:focus-within {
          border-color: #eab308;
          box-shadow: 0 0 0 1px #eab308;
        }

        /* Hide toolbar in read-only mode */
        .rich-text-editor .ql-toolbar.ql-snow {
          display: ${readOnly ? "none" : "block"};
        }

        /* Adjust container height when toolbar is hidden */
        ${readOnly
          ? `
          .rich-text-editor .ql-container {
            height: ${height}px !important;
          }
          .rich-text-editor .ql-editor {
            padding: 0 !important;
          }
        `
          : ""}
      `}</style>
    </div>
  );
};

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
