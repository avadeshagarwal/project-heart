"use client"

import { useState, useCallback } from "react"
import Cropper, { Point, Area } from "react-easy-crop"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { RotateCcw } from "lucide-react"

interface ImageCropperProps {
  imageSrc: string
  open: boolean
  onClose: () => void
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void
}

export function ImageCropper({ imageSrc, open, onClose, onCropComplete }: ImageCropperProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)

  const handleCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    onCropComplete(croppedArea, croppedAreaPixels)
  }, [onCropComplete])

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl bg-background">
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
        </DialogHeader>

        <div className="relative h-[400px] w-full bg-black/5 rounded-md overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={4 / 3} // Can be parameterized
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
          />
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium w-12">Zoom</span>
            <Slider
              value={[zoom]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={([val]) => setZoom(val)}
              className="flex-1"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium w-12">Rotate</span>
            <Slider
              value={[rotation]}
              min={0}
              max={360}
              step={1}
              onValueChange={([val]) => setRotation(val)}
              className="flex-1"
            />
            <Button variant="ghost" size="icon" onClick={() => setRotation(0)}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Apply Crop</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
