import imageCompression from "browser-image-compression"

export async function compressImage(file: File): Promise<File> {
  // Only compress if it's a valid image type (skip svgs, gifs)
  if (!file.type.startsWith("image/") || file.type === "image/gif" || file.type === "image/svg+xml") {
    return file
  }

  const options = {
    maxSizeMB: 1, // Enterprise standard for reasonable quality/size
    maxWidthOrHeight: 2048,
    useWebWorker: true,
  }

  try {
    const compressedFile = await imageCompression(file, options)
    // browser-image-compression sometimes strips the name
    return new File([compressedFile], file.name, {
      type: compressedFile.type,
      lastModified: Date.now(),
    })
  } catch (error) {
    console.error("Image compression failed:", error)
    return file // Fallback to original
  }
}

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
