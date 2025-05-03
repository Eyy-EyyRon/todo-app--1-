"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, X } from "lucide-react"

interface TodoFormProps {
  initialValue?: string
  buttonText: string
  onSubmit: (title: string) => void
  onCancel: () => void
}

export default function TodoForm({ initialValue = "", buttonText, onSubmit, onCancel }: TodoFormProps) {
  const [title, setTitle] = useState(initialValue)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onSubmit(title.trim())
      setTitle("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex items-center space-x-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1"
          autoFocus
        />
        <Button type="submit" size="icon" disabled={!title.trim()}>
          <Check className="h-4 w-4" />
        </Button>
        <Button type="button" size="icon" variant="outline" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}

