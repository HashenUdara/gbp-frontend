"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { QnA } from "@/lib/mock-data";
import {
  MessageCircleQuestion,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  MessageSquare,
  Clock,
  CheckCircle2,
  Plus,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QnATabProps {
  questions: QnA[];
}

export function QnATab({ questions }: QnATabProps) {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "answered" | "unanswered"
  >("all");

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredQuestions = questions.filter((q) => {
    if (filterStatus === "answered") return q.answer;
    if (filterStatus === "unanswered") return !q.answer;
    return true;
  });

  const answeredCount = questions.filter((q) => q.answer).length;
  const unansweredCount = questions.filter((q) => !q.answer).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Questions & Answers</h2>
          <p className="text-sm text-muted-foreground">
            Answer customer questions to help them learn about your business
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Q&A
        </Button>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
        <button
          onClick={() => setFilterStatus("all")}
          className={cn(
            "flex-1 text-center px-4 py-3 rounded-lg transition-colors",
            filterStatus === "all" ? "bg-accent" : "hover:bg-accent/50"
          )}
        >
          <p className="text-2xl font-semibold">{questions.length}</p>
          <p className="text-xs text-muted-foreground">Total Questions</p>
        </button>
        <Separator orientation="vertical" className="h-12" />
        <button
          onClick={() => setFilterStatus("answered")}
          className={cn(
            "flex-1 text-center px-4 py-3 rounded-lg transition-colors",
            filterStatus === "answered" ? "bg-accent" : "hover:bg-accent/50"
          )}
        >
          <p className="text-2xl font-semibold text-emerald-600">
            {answeredCount}
          </p>
          <p className="text-xs text-muted-foreground">Answered</p>
        </button>
        <button
          onClick={() => setFilterStatus("unanswered")}
          className={cn(
            "flex-1 text-center px-4 py-3 rounded-lg transition-colors",
            filterStatus === "unanswered" ? "bg-accent" : "hover:bg-accent/50"
          )}
        >
          <p className="text-2xl font-semibold text-amber-600">
            {unansweredCount}
          </p>
          <p className="text-xs text-muted-foreground">Awaiting Answer</p>
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.map((qna) => {
          const isExpanded = expandedIds.includes(qna.id);

          return (
            <Card key={qna.id} className="overflow-hidden">
              <CardContent className="p-0">
                {/* Question Header */}
                <button
                  onClick={() => toggleExpanded(qna.id)}
                  className="w-full p-4 flex items-start gap-4 text-left hover:bg-accent/50 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary mt-0.5">
                    <MessageCircleQuestion className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-foreground pr-4">
                          {qna.question}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span>Asked by {qna.askedBy}</span>
                          <span>•</span>
                          <span>{qna.askedAt}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" />
                            {qna.upvotes}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {qna.answer ? (
                          <Badge
                            variant="secondary"
                            className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 gap-1"
                          >
                            <CheckCircle2 className="h-3 w-3" />
                            Answered
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400 gap-1"
                          >
                            <Clock className="h-3 w-3" />
                            Pending
                          </Badge>
                        )}
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t border-border">
                    {qna.answer ? (
                      <div className="p-4 pl-16 bg-accent/30">
                        <div className="flex items-start gap-3">
                          <div className="p-1.5 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">
                                {qna.answeredBy}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {qna.answeredAt}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {qna.answer}
                            </p>
                            <div className="flex items-center gap-2 mt-3">
                              <Button variant="outline" size="sm">
                                Edit Answer
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 pl-16 bg-accent/30">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Write Answer
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-2 text-muted-foreground"
                          >
                            <Sparkles className="h-4 w-4" />
                            Generate AI Answer
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <MessageCircleQuestion className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-1">No questions found</h3>
          <p className="text-sm text-muted-foreground">
            {filterStatus !== "all"
              ? `No ${filterStatus} questions yet`
              : "Questions from customers will appear here"}
          </p>
        </div>
      )}

      {/* Pro Tip */}
      <Card className="bg-gradient-to-r from-primary/5 to-violet-500/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-sm">Pro Tip</p>
              <p className="text-sm text-muted-foreground mt-1">
                Answering questions promptly can improve your business
                visibility in Google Search and Maps. Aim to respond within 24
                hours.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
