"use client"

import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const [videos, setVideos] = useState<IVideo[]>([])

  useEffect(()=>{
    const fetchVdieos = async () => {
      try {
       const data = await apiClient.getVideos()
       setVideos(data)
      } catch (error) {
        console.log(error);
        
      }
    }
  },[])

  return (
   <div>
    <h1>
      Hello world
    </h1>
   </div>
  );
}
