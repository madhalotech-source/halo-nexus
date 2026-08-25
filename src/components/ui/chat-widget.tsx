"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const initialMessage: Message = {
  role: "assistant",
  content: "Hi! I'm HALO AI. Ask me anything about M A D HALO Technologies.",
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Placeholder response — real API wired in later
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Thanks for your message! Live answers are coming soon — for now, feel free to explore the site.",
        },
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="relative w-80 h-96 mb-4">
          {/* Glow wrapper */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent to-accent-gold opacity-30 blur-lg" />

          <div className="relative glass-panel rounded-2xl w-full h-full flex flex-col overflow-hidden border border-accent-gold/30">
            {/* Header */}
            <div className="px-4 py-3 border-b border-accent-gold/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-accent-gold flex items-center justify-center">
                  <Bot className="text-white" size={14} />
                </div>
                <p className="font-semibold text-sm">
                  HALO <span className="text-accent-gold">AI</span>
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground text-sm"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`text-sm max-w-[85%] px-3 py-2 rounded-md ${
                    msg.role === "user"
                      ? "bg-accent text-white self-end"
                      : "bg-card-border/40 text-foreground self-start"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-accent-gold/20 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-transparent border border-card-border rounded-md px-3 py-2 text-sm outline-none focus:border-accent transition-colors"
              />
              <button
                onClick={handleSend}
                className="px-3 py-2 rounded-md bg-gradient-to-br from-accent to-accent-gold text-white text-sm hover:brightness-110 transition-all flex items-center justify-center"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating HALO Orb launcher */}
      <div className="relative">
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-accent to-accent-gold blur-lg opacity-60 ${
            !isOpen ? "animate-pulse" : ""
          }`}
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-gold hover:brightness-110 transition-all flex items-center justify-center shadow-lg"
          aria-label="Toggle HALO AI chat"
        >
          {isOpen ? (
            <X className="text-white" size={24} />
          ) : (
            <MessageCircle className="text-white" size={24} />
          )}
        </button>
      </div>
    </div>
  );
}