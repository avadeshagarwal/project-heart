"use client"

import { cn } from "@/lib/utils"

interface LetterSectionProps {
  data: any
}

export function LetterSection({ data }: LetterSectionProps) {
  const content = data.content || "Write your heartfelt message here..."
  const signature = data.signature || "With love,"
  const fontFamily = data.fontFamily || "serif"

  return (
    <div className="w-full min-h-[80dvh] flex items-center justify-center py-20 px-6 sm:px-12 bg-[#F9F6F0] text-gray-800">
      <div className="max-w-3xl mx-auto space-y-12 w-full">
        <div 
          className={cn(
            "prose prose-lg sm:prose-xl md:prose-2xl prose-gray mx-auto text-center leading-relaxed",
            fontFamily === "serif" ? "font-serif" : "font-sans"
          )}
        >
          {/* Split by newline and render paragraphs */}
          {content.split("\n").map((paragraph: string, i: number) => (
            <p key={i} className="mb-6 whitespace-pre-wrap">
              {paragraph}
            </p>
          ))}
        </div>

        {signature && (
          <div className="pt-12 text-right">
            <p 
              className={cn(
                "text-2xl sm:text-3xl italic text-gray-600",
                fontFamily === "serif" ? "font-serif" : "font-sans"
              )}
            >
              {signature}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
