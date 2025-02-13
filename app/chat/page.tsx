'use client';

import { useState } from 'react';
import { BsChatDots, BsMic, BsCamera } from 'react-icons/bs';

type Mode = 'chat' | 'voice' | 'vision';
type Message = { text: string; sender: 'user' | 'orbe' };

export default function Page() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [activeMode, setActiveMode] = useState<Mode>('chat');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputMessage.trim()) {
            setMessages([...messages, { text: inputMessage, sender: 'user' }]);
            setInputMessage('');
            // Simulate Orbe's response
            setTimeout(() => {
                setMessages(prev => [...prev, { text: 'Hello! This is Orbe.', sender: 'orbe' }]);
            }, 1000);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Mode Selection Tabs */}
            <div className="flex justify-center mb-6">
                <div className="flex gap-4 bg-gray-100 p-2 rounded-lg">
                    <button
                        onClick={() => setActiveMode('chat')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                            activeMode === 'chat' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                        }`}
                    >
                        <BsChatDots /> Chat
                    </button>
                    <button
                        onClick={() => setActiveMode('voice')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                            activeMode === 'voice' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                        }`}
                    >
                        <BsMic /> Voice
                    </button>
                    <button
                        onClick={() => setActiveMode('vision')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                            activeMode === 'vision' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                        }`}
                    >
                        <BsCamera /> Vision
                    </button>
                </div>
            </div>

            {/* Chat Interface */}
            <div className="bg-white rounded-lg shadow-lg">
                <div className="bg-gray-100 rounded-t-lg p-4 h-[500px] overflow-y-auto mb-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`mb-2 ${
                                message.sender === 'user' ? 'text-right' : 'text-left'
                            }`}
                        >
                            <span
                                className={`inline-block p-2 rounded-lg ${
                                    message.sender === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-300 text-black'
                                }`}
                            >
                                {message.text}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Input Section */}
                <form onSubmit={handleSendMessage} className="p-4 border-t">
                    <div className="flex gap-2">
                        {activeMode === 'vision' && (
                            <button
                                type="button"
                                className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
                                onClick={() => {/* Handle image upload */}}
                            >
                                <BsCamera size={20} />
                            </button>
                        )}
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            className="flex-1 p-2 border rounded-lg"
                            placeholder={`${
                                activeMode === 'chat' 
                                    ? 'Type your message...' 
                                    : activeMode === 'voice' 
                                        ? 'Press the mic button to speak...'
                                        : 'Upload an image or type your question...'
                            }`}
                        />
                        {activeMode === 'voice' && (
                            <button
                                type="button"
                                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                                onClick={() => {/* Handle voice recording */}}
                            >
                                <BsMic size={20} />
                            </button>
                        )}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}