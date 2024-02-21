"use client";

import Live from "@/components/Live";
import Navbar from "@/components/Navbar";
import RightSidebar from "@/components/RightSideBar";
import LeftSidebar from "@/components/RightSideBar";
import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { handleResize, initializeFabric } from "@/lib/canvas";

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null); 
  const isDrawing = useRef(false);
  const shapeRef = useRef<fabric.Object | null>(null);
  const selectedShapeRef = useRef<string | null>(null);
  useEffect(()=>{
    const canvas = initializeFabric({canvasRef, fabricRef});

    canvas.on("mouse:down", (options) => {
      options,
      canvas,
      selectedShapeRef,
      isDrawing,
      shapeRef,
    });
    window.addEventListener("resize", () => {
      // handleResize({ fabricRef });
      handleResize({ canvas: fabricRef.current });
    })
  }, [])

  return (
    <main className="h-screen overflow-hidden">
      <Navbar />
      <section className="flex h-full flex-row">
        <LeftSidebar />
        <Live canvasRef={canvasRef}/>
        <RightSidebar />
      </section>
    </main>
  );
}