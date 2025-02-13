'use client';

import { useState } from 'react';


interface LayoutProps {
    children: React.ReactNode;
}

export default function ChatLayout({ children }: LayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`${
                    isSidebarOpen ? 'w-64' : 'w-16'
                } bg-gray-800 text-white transition-all duration-300 ease-in-out`}
            >
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-4 w-full text-center hover:bg-gray-700"
                >
                    {isSidebarOpen ? '←' : '→'}
                </button>
                {/* Add your sidebar content here */}
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-auto">
                {children}
            </div>
        </div>
    );
}