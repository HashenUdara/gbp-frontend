"use client";

import { useState, useEffect, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

function TypingAnimation({
  text,
  speed = 30,
  className,
  onComplete,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (!isComplete && text.length > 0) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, isComplete, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && (
        <span className="inline-block w-[2px] h-[1em] bg-muted-foreground/60 ml-0.5 animate-pulse" />
      )}
    </span>
  );
}

interface AutoDraftingCardProps {
  avatarSrc?: string;
  avatarFallback?: string;
  messages: string[];
  className?: string;
}

function AutoDraftingCard({
  avatarSrc,
  avatarFallback = "AI",
  messages,
  className,
}: AutoDraftingCardProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const handleMessageComplete = useCallback(() => {
    if (currentMessageIndex < messages.length - 1) {
      // Small delay before starting next message
      setTimeout(() => {
        setCurrentMessageIndex((prev) => prev + 1);
      }, 300);
    } else {
      setIsTyping(false);
    }
  }, [currentMessageIndex, messages.length]);

  return (
    <div
      className={cn(
        // Outer wrapper with gradient border effect
        "relative rounded-2xl p-[1px]",
        "bg-gradient-to-br from-rose-200/40 via-transparent to-orange-200/40",
        className
      )}
    >
      {/* Inner card */}
      <div className="relative rounded-2xl bg-card/95 backdrop-blur-sm p-6 shadow-lg">
        {/* Header with avatar and status */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-8 w-8 ring-2 ring-offset-2 ring-offset-background ring-primary/10">
            <AvatarImage src={avatarSrc} alt="AI Avatar" />
            <AvatarFallback className="bg-gradient-to-br from-orange-100 to-rose-100 text-orange-600 text-xs font-medium">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">
              Auto drafting response
            </span>
            {isTyping && (
              <span className="flex gap-0.5">
                <span
                  className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </span>
            )}
          </div>
        </div>

        {/* Message content */}
        <div className="space-y-2 text-foreground/90 leading-relaxed">
          {messages.slice(0, currentMessageIndex + 1).map((message, index) => (
            <p key={index}>
              {index < currentMessageIndex ? (
                message
              ) : (
                <TypingAnimation
                  text={message}
                  speed={25}
                  onComplete={handleMessageComplete}
                />
              )}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TypingAnimationDemo() {
  const [key, setKey] = useState(0);

  const demoMessages = [
    "Thanks for the update, appreciate you making those edits. I'll go through it and send over any thoughts soon.",
    "I'll also jump on a call later this week to discuss the next steps.",
  ];

  const handleRestart = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            AI Typing Animation
          </h1>
          <p className="text-muted-foreground">
            A smooth auto-drafting response animation effect
          </p>
        </div>

        {/* Demo Card */}
        <AutoDraftingCard
          key={key}
          messages={demoMessages}
          avatarFallback="AI"
        />

        {/* Restart button */}
        <div className="flex justify-center">
          <button
            onClick={handleRestart}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Restart Animation
          </button>
        </div>

        {/* Alternative styles showcase */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-center text-muted-foreground">
            More Variants
          </h2>

          {/* Minimal variant */}
          <div className="rounded-xl border border-border bg-muted/30 p-6">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">John Doe</span>
                  <span className="text-xs text-muted-foreground">
                    is typing...
                  </span>
                </div>
                <div className="text-muted-foreground text-sm">
                  <TypingAnimation
                    key={`minimal-${key}`}
                    text="Hey! Just wanted to follow up on our conversation from earlier. Let me know when you're free to chat!"
                    speed={35}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Code typing variant */}
          <div className="rounded-xl border border-border bg-zinc-950 p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-zinc-500 text-xs font-mono">
                terminal
              </span>
            </div>
            <div className="font-mono text-sm text-green-400">
              <span className="text-zinc-500">$</span>{" "}
              <TypingAnimation
                key={`code-${key}`}
                text="npm install @ai/typing-animation --save"
                speed={50}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
