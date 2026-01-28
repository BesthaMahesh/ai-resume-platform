import { useCallback, useState } from "react"; // Simulating dropzone logic manually or using a library if permissible, but will keep simple for now
import { Upload, FileText, X } from "lucide-react";

interface DropzoneProps {
    onFileSelect: (file: File) => void;
    file: File | null;
    onClear: () => void;
}

export default function Dropzone({ onFileSelect, file, onClear }: DropzoneProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && (droppedFile.type === "application/pdf" || droppedFile.type === "text/plain")) {
            onFileSelect(droppedFile);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            onFileSelect(selectedFile);
        }
    };

    if (file) {
        return (
            <div className="relative flex items-center p-4 border-2 border-indigo-100 bg-indigo-50 rounded-xl">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                    <FileText className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="ml-4 flex-1 truncate">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(0)} KB</p>
                </div>
                <button
                    onClick={onClear}
                    className="p-1 hover:bg-indigo-200 rounded-full transition-colors"
                >
                    <X className="h-5 w-5 text-indigo-500" />
                </button>
            </div>
        );
    }

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${isDragging
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
                }`}
        >
            <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.txt"
                onChange={handleFileInput}
            />
            <div className="flex flex-col items-center pointer-events-none">
                <div className="p-4 bg-indigo-50 rounded-full mb-4">
                    <Upload className="h-8 w-8 text-indigo-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">
                    Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    PDF or TXT (max 5MB)
                </p>
            </div>
        </div>
    );
}
