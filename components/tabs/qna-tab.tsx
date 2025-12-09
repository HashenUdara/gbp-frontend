"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  HelpCircle,
  MessageSquare,
  ThumbsUp,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

const questions = [
  {
    id: 1,
    question: "Do you have vegan milk alternatives?",
    askedBy: "Local Guide",
    askedDate: "2 days ago",
    upvotes: 15,
    answered: true,
    answers: [
      {
        id: 1,
        text: "Yes! We offer oat milk, almond milk, coconut milk, and soy milk. Oat milk is our most popular alternative. All alternatives are available at no extra charge! 🌱",
        answeredBy: "Owner",
        date: "2 days ago",
        upvotes: 12,
        isOwner: true,
      },
      {
        id: 2,
        text: "They have great oat milk lattes! Highly recommend.",
        answeredBy: "Sarah M.",
        date: "1 day ago",
        upvotes: 5,
        isOwner: false,
      },
    ],
  },
  {
    id: 2,
    question: "Is there parking available nearby?",
    askedBy: "Mike T.",
    askedDate: "5 days ago",
    upvotes: 23,
    answered: true,
    answers: [
      {
        id: 1,
        text: "Yes, we have a dedicated parking lot behind the building with 20 spaces for customers. Street parking is also available on Innovation Street. We validate parking for the lot next door if our lot is full!",
        answeredBy: "Owner",
        date: "5 days ago",
        upvotes: 18,
        isOwner: true,
      },
    ],
  },
  {
    id: 3,
    question: "Can I bring my laptop and work here?",
    askedBy: "Remote Worker",
    askedDate: "1 week ago",
    upvotes: 31,
    answered: true,
    answers: [
      {
        id: 1,
        text: "We're designed as a workspace-friendly cafe. We have plenty of power outlets, high-speed WiFi (100+ Mbps), comfortable seating for long sessions, and a quiet zone area for focused work. Many of our regulars work here daily!",
        answeredBy: "Owner",
        date: "1 week ago",
        upvotes: 28,
        isOwner: true,
      },
    ],
  },
  {
    id: 4,
    question: "Do you host private events or meetings?",
    askedBy: "Event Planner",
    askedDate: "3 days ago",
    upvotes: 8,
    answered: false,
    answers: [],
  },
  {
    id: 5,
    question: "What are your busiest hours?",
    askedBy: "First Timer",
    askedDate: "1 day ago",
    upvotes: 12,
    answered: false,
    answers: [],
  },
]

export function QnaTab() {
  const [answeringQuestion, setAnsweringQuestion] = useState<number | null>(null)
  const [answerText, setAnswerText] = useState("")
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([1, 2])

  const toggleExpand = (id: number) => {
    setExpandedQuestions((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const unansweredCount = questions.filter((q) => !q.answered).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Questions & Answers</h2>
          <p className="text-sm text-muted-foreground">Respond to customer questions about your business</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="recent">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Upvoted</SelectItem>
              <SelectItem value="unanswered">Unanswered</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{questions.length}</p>
                <p className="text-xs text-muted-foreground">Total Questions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{questions.filter((q) => q.answered).length}</p>
                <p className="text-xs text-muted-foreground">Answered</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{unansweredCount}</p>
                <p className="text-xs text-muted-foreground">Needs Answer</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Clock className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2h</p>
                <p className="text-xs text-muted-foreground">Avg. Response</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Unanswered Alert */}
      {unansweredCount > 0 && (
        <Card className="bg-warning/5 border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-warning" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">You have {unansweredCount} unanswered questions</p>
                <p className="text-xs text-muted-foreground">
                  Responding quickly helps build trust with potential customers
                </p>
              </div>
              <Button size="sm" variant="outline">
                Answer Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((q) => (
          <Card key={q.id} className="bg-card border-border">
            <CardContent className="p-6">
              {/* Question */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ThumbsUp className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium text-foreground">{q.upvotes}</span>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-semibold text-foreground">{q.question}</span>
                    {!q.answered && (
                      <Badge variant="secondary" className="bg-warning/10 text-warning border-0">
                        Needs Answer
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Asked by {q.askedBy}</span>
                    <span>•</span>
                    <span>{q.askedDate}</span>
                    {q.answered && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-success">
                          <CheckCircle2 className="w-3 h-3" />
                          {q.answers.length} {q.answers.length === 1 ? "answer" : "answers"}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Answers */}
                  {q.answers.length > 0 && (
                    <div className="mt-4">
                      <button
                        onClick={() => toggleExpand(q.id)}
                        className="flex items-center gap-1 text-sm text-primary hover:underline mb-3"
                      >
                        {expandedQuestions.includes(q.id) ? "Hide" : "Show"} answers
                        {expandedQuestions.includes(q.id) ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      {expandedQuestions.includes(q.id) && (
                        <div className="space-y-4 pl-4 border-l-2 border-border">
                          {q.answers.map((answer) => (
                            <div key={answer.id} className="space-y-2">
                              <div className="flex items-start gap-3">
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback
                                    className={answer.isOwner ? "bg-primary text-primary-foreground" : ""}
                                  >
                                    {answer.answeredBy[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-foreground">{answer.answeredBy}</span>
                                    {answer.isOwner && (
                                      <Badge variant="secondary" className="text-xs">
                                        Owner
                                      </Badge>
                                    )}
                                    <span className="text-xs text-muted-foreground">{answer.date}</span>
                                  </div>
                                  <p className="text-sm text-foreground mt-1">{answer.text}</p>
                                  <button className="flex items-center gap-1 text-xs text-muted-foreground mt-2 hover:text-foreground">
                                    <ThumbsUp className="w-3 h-3" />
                                    Helpful ({answer.upvotes})
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Answer Form */}
                  {answeringQuestion === q.id ? (
                    <div className="mt-4 space-y-3">
                      <Textarea
                        placeholder="Write your answer..."
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => setAnsweringQuestion(null)}>
                          Cancel
                        </Button>
                        <Button size="sm">
                          <Send className="w-4 h-4 mr-2" />
                          Post Answer
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <Button variant="outline" size="sm" onClick={() => setAnsweringQuestion(q.id)}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        {q.answered ? "Add Another Answer" : "Answer Question"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
