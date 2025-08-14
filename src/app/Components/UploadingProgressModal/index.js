import React from 'react'
import { Progress } from "@/components/ui/progress"

export default function UploadingProgressModal({progress}) {
    return (
        <>
            <div className="fixed inset-0 bg-transparent bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-3 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-purple-600 font-medium">Uploading PDF</span>
                        </div>
                        <span className="text-purple-600 font-semibold">{progress}</span>
                    </div>
                    <Progress value={progress} className="transition-all duration-300 ease-in-out"/>
                </div>
            </div>
        </>
    )
}
