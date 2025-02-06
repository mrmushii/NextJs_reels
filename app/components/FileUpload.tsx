"use client";
import React, {useState } from "react";
import {  IKUpload } from "imagekitio-next";
import {Loader2} from "lucide-react"
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface FileUploadProps{
  onSuccess:(res:IKUploadResponse) => void
  onProgress: (progress:number) => void
  fileType?: "image" | "video"
}




export default function FileUpload({onSuccess,onProgress,fileType = "image"}
  :FileUploadProps
) {
 const [uploading, setuploading] = useState(false)
 const [error, seterror] = useState<string | null>(null)


  const onError = (err: {message: string}) => {
    console.log("Error", err);
    seterror(err.message)
    setuploading(false)
  };
  
  const handleSuccess = (res: IKUploadResponse) => {
    console.log("Success", res);
    setuploading(false)
    seterror(null)
    onSuccess(res)
  };
  
  const handleProgress = (evt:ProgressEvent) => {
   if(evt.lengthComputable && onProgress){
    const percentComplete = (evt.loaded/evt.total) *100;
    onProgress(Math.round(percentComplete))
   }
  };
  
  const handleStartUpload = () => {
    setuploading(true)
    seterror(null)
  };

  const validateFile = (file:File) =>{
    if (fileType === "video") {
      if(!file.type.startsWith("video/"))
      {
        seterror("Please uploda a video file")
        return false
      }
      if(file.size>100*1024*1024){
        seterror("Video must be less than 100mb")
        return false
      }
    }else{
      const validTypes = ["image/jpeg","image/png","image/webp"]
      if(!validTypes.includes(file.type)){
        seterror("please upload a valid file")
        return false
      }
      if(file.size>5*1024*1024){
        seterror("Image must be less than 5MB")
        return false
      }
    }
    return false
    
  }

  return (
    <div className="space-y-2">
      
      
        
        <IKUpload
          fileName={fileType === "video"? "video" :"image"}
          useUniqueFileName={true}    
          validateFile={validateFile}
          folder={fileType === "video"? "/video" :"/image"}
          onError={onError}
          onSuccess={handleSuccess}
          onUploadProgress={handleProgress}
          onUploadStart={handleStartUpload}
          accept={fileType ==="video"? "video/*" : "image/*"}
        />
       {
        uploading && (
          <div className="flex items-center gap-2 text-sm text-primary">
            <Loader2 className="animate-spin w-4 h-4"/>
            <span>Uploading...</span>
          </div>
        )
       }{
        error&& (
          <div className="text-error text-sm">{error}</div>
        )
       }
    </div>
  );
}