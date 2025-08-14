'use client'
import React, { useState } from "react";
import { Upload } from "lucide-react";
import UploadingProgressModal from "../UploadingProgressModal";
import NoteBookLM from "../NoteBookLM";
import { upload } from "@/app/apiServices";

export default function UploadInput() {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [sessionId, setSessionId] = useState(null);
    const [error, setError] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        setProgress(0);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("pdf", file);

            const res = await upload(formData, {
                onUploadProgress: (event) => {
                    if (event.total) {
                        const percent = Math.round((event.loaded * 100) / event.total);
                        setProgress(percent);
                    }
                },
            })

            if (res.data.sessionId) {
                localStorage.setItem("sessionId", res.data.sessionId);
                setSessionId(res.data.sessionId);
                setFileUrl(URL.createObjectURL(file));
            }
        } catch (err) {
            setError("Error uploading file");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <UploadingProgressModal progress={progress} />
            ) : sessionId && fileUrl ? (
                <NoteBookLM sessionId={sessionId} fileUrl={fileUrl} />
            ) : (
                <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 ">
                    <label
                        className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg 
                        flex flex-col items-center text-center hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                    >
                        <input
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
                            <Upload size={30} color="#8758b6" strokeWidth={2.5} />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Upload PDF to start chatting
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Click or drag and drop your file here
                        </p>

                        {error && <p className="mt-3 text-red-600">{error}</p>}
                    </label>
                </div>
            )}
        </>
    );
}
