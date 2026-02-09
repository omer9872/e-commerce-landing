import {
  DeleteOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button } from "antd";
import { Upload } from "antd";
import React from "react";

import { AuthImage } from "../AuthImage";

interface ImageSelectProps {
  className?: string;
  image: string | File | undefined;
  onRemove: () => void;
  onSelect: (file: File) => void;
}
const ImageSelect: React.FC<ImageSelectProps> = ({
  className,
  image,
  onRemove,
  onSelect,
}) => {
  return (
    <div className={`flex flex-row items-center gap-2 ${className}`}>
      {image ? (
        <div className="relative">
          <Avatar
            size={200}
            shape="square"
            icon={<UserOutlined />}
            className="relative"
            src={
              typeof image === "string" ? (
                <AuthImage imageId={image} />
              ) : (
                <img src={URL.createObjectURL(image)} alt="" />
              )
            }
          />

          <button
            onClick={() => {
              onRemove();
            }}
            className="cursor-pointer flex items-center justify-center border-none w-8 h-8 absolute top-1 right-1 bg-white z-10 rounded-[20px] hover:rounded-[3px] duration-300"
          >
            <DeleteOutlined size={10} className="text-lg text-red-500" />
          </button>
        </div>
      ) : (
        <Upload
          multiple={false}
          maxCount={1}
          showUploadList={false}
          beforeUpload={(file) => {
            onSelect(file);
            return false;
          }}
        >
          <Button className="flex flex-col items-center justify-center w-[200px] h-[200px]">
            <UploadOutlined />
            <p>Select Image</p>
          </Button>
        </Upload>
      )}
    </div>
  );
};

ImageSelect.displayName = "ImageSelect";
export default ImageSelect;
