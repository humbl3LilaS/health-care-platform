"use client"


import {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import Image from "next/image";
import {convertFileToUrl} from "@/lib/utils";

type FileUploaderProps = {
    files: File[],
    onChange: (value: File | File[]) => void
}

const FileUploader = ({files, onChange}: FileUploaderProps) => {

    const onDrop = useCallback((acceptedFile: File[]) => {
        onChange(acceptedFile);
    }, [onChange])

    const {getRootProps, getInputProps} = useDropzone({onDrop})

    return (
        <div {...getRootProps()} className={"file-upload"}>
            <input {...getInputProps()} />
            {
                files.length > 0 ?
                <Image src={convertFileToUrl(files[0])}
                       alt={"uploaded identification document"}
                       width={400}
                       height={250}
                       className={"w-full max-h-[400px] overflow-hidden object-cover rounded-lg"}/> :
                <>
                    <Image src={"/assets/icons/upload.svg"} alt={"upload"} width={40} height={40}/>
                    <div className={"file-upload_label"}>
                        <p className={"text-14-regular"}>
                            <span className={"text-green-500"}>
                                Click to upload
                            </span>
                            or drag and drop
                        </p>
                        <p>
                            SVG, PNG, JPG or Gif  (max 800x400)
                        </p>
                    </div>
                </>
            }
        </div>
    );
};
export default FileUploader;