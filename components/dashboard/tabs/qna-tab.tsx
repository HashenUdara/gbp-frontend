"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EmptyState, StatusBadge } from "@/components/ui/primitives";
import { QnA } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useExpandedState } from "@/hooks";
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

// ============================================
// Types
// ============================================

interface QnATabProps {
  questions: QnA[];
  onAddQuestion?: () => void;
  onAnswer?: (question: QnA) => void;
  onGenerateAIAnswer?: (question: QnA) => void;
  onEditAnswer?: (question: QnA) => void;
}

type FilterStatus = "all" | "answered" | "unanswered";

// ============================================
// Sub-components
// ============================================

interface QnAStatsProps {
  total: number;
  answered: number;
  unanswered: number;
  activeFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

function QnAStats({
  total,
  answered,
  unanswered,
  activeFilter,
  onFilterChange,
}: QnAStatsProps) {
  const stats = [
    {
      key: "all" as const,
      label: "Total Questions",
      value: total,
      color: "text-foreground",
    },
    {
      key: "answered" as const,
      label: "Answered",
      value: answered,
      color: "text-emerald-600",
    },
    {
      key: "unanswered" as const,
      label: "Awaiting Answer",
      value: unanswered,
      color: "text-amber-600",
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-card border border-border rounded-xl">
      {stats.map((stat, index) => (
        <React.Fragment key={stat.key}>
          {index > 0 && <Separator orientation="vertical" className="hidden sm:block h-12" />}
          {index > 0 && <Separator className="sm:hidden" />}
          <button
            onClick={() => onFilterChange(stat.key)}
            className={cn(
              "flex-1 text-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors",
              activeFilter === stat.key ? "bg-accent" : "hover:bg-accent/50"
            )}
          >
            <p className={cn("text-xl sm:text-2xl font-semibold", stat.color)}>
              {stat.value}
            </p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">{stat.label}</p>
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}

interface QuestionCardProps {
  qna: QnA;
  isExpanded: boolean;
  onToggle: () => void;
  onAnswer?: () => void;
  onGenerateAI?: () => void;
  onEditAnswer?: () => void;
}

function QuestionCard({
  qna,
  isExpanded,
  onToggle,
  onAnswer,
  onGenerateAI,
  onEditAnswer,
}: QuestionCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Question Header */}
        <button
          onClick={onToggle}
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
                  <StatusBadge status="success" variant="subtle">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Answered
                  </StatusBadge>
                ) : (
                  <StatusBadge status="warning" variant="subtle">
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                  </StatusBadge>
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
              <AnswerSection qna={qna} onEdit={onEditAnswer} />
            ) : (
              <NoAnswerSection
                onAnswer={onAnswer}
                onGenerateAI={onGenerateAI}
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface AnswerSectionProps {
  qna: QnA;
  onEdit?: () => void;
}

function AnswerSection({ qna, onEdit }: AnswerSectionProps) {
  return (
    <div className="p-4 pl-16 bg-accent/30">
      <div className="flex items-start gap-3">
        <div className="p-1.5 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium">{qna.answeredBy}</span>
            <span className="text-xs text-muted-foreground">
              {qna.answeredAt}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{qna.answer}</p>
          <div className="flex items-center gap-2 mt-3">
            <Button variant="outline" size="sm" onClick={onEdit}>
              Edit Answer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NoAnswerSectionProps {
  onAnswer?: () => void;
  onGenerateAI?: () => void;
}

function NoAnswerSection({ onAnswer, onGenerateAI }: NoAnswerSectionProps) {
  return (
    <div className="p-4 pl-16 bg-accent/30">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={onAnswer}
        >
          <MessageSquare className="h-4 w-4" />
          Write Answer
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground"
          onClick={onGenerateAI}
        >
          <Sparkles className="h-4 w-4" />
          Generate AI Answer
        </Button>
      </div>
    </div>
  );
}

function ProTipCard() {
  return (
    <Card className="bg-linear-to-r from-primary/5 to-violet-500/5 border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium text-sm">Pro Tip</p>
            <p className="text-sm text-muted-foreground mt-1">
              Answering questions promptly can improve your business visibility
              in Google Search and Maps. Aim to respond within 24 hours.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// Main Component
// ============================================

export function QnATab({
  questions,
  onAddQuestion,
  onAnswer,
  onGenerateAIAnswer,
  onEditAnswer,
}: QnATabProps) {
  const [filterStatus, setFilterStatus] = React.useState<FilterStatus>("all");
  const { toggle, isExpanded } = useExpandedState<string>();

  // Calculate stats
  const stats = React.useMemo(
    () => ({
      total: questions.length,
      answered: questions.filter((q) => q.answer).length,
      unanswered: questions.filter((q) => !q.answer).length,
    }),
    [questions]
  );

  // Filter questions
  const filteredQuestions = React.useMemo(
    () =>
      questions.filter((q) => {
        if (filterStatus === "answered") return q.answer;
        if (filterStatus === "unanswered") return !q.answer;
        return true;
      }),
    [questions, filterStatus]
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-semibold">Questions & Answers</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Answer customer questions to help them learn about your business
          </p>
        </div>
        <Button className="gap-1.5 sm:gap-2 h-9 sm:h-10 text-xs sm:text-sm w-fit" onClick={onAddQuestion}>
          <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Add Q&A
        </Button>
      </div>

      {/* Stats */}
      <QnAStats
        total={stats.total}
        answered={stats.answered}
        unanswered={stats.unanswered}
        activeFilter={filterStatus}
        onFilterChange={setFilterStatus}
      />

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.map((qna) => (
          <QuestionCard
            key={qna.id}
            qna={qna}
            isExpanded={isExpanded(qna.id)}
            onToggle={() => toggle(qna.id)}
            onAnswer={() => onAnswer?.(qna)}
            onGenerateAI={() => onGenerateAIAnswer?.(qna)}
            onEditAnswer={() => onEditAnswer?.(qna)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredQuestions.length === 0 && (
        <EmptyState
          icon={MessageCircleQuestion}
          title="No questions found"
          description={
            filterStatus !== "all"
              ? `No ${filterStatus} questions yet`
              : "Questions from customers will appear here"
          }
        />
      )}

      {/* Pro Tip */}
      <ProTipCard />
    </div>
  );
}
