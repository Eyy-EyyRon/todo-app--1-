"use client"

import type React from "react"

import { useState } from "react"
import { Pencil, Trash2, Check, X } from "lucide-react"
import type { Todo } from "@/components/todo-app"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string) => void
  onUpdate: (id: string, title: string) => void
  onCancelEdit: () => void
  isEditing: boolean
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  onUpdate,
  onCancelEdit,
  isEditing,
}: TodoItemProps) {
  const [editedTitle, setEditedTitle] = useState(todo.title)

  const handleUpdate = () => {
    if (editedTitle.trim()) {
      onUpdate(todo.id, editedTitle)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUpdate()
    } else if (e.key === "Escape") {
      onCancelEdit()
    }
  }

  // Format the date
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(todo.createdAt)

  if (isEditing) {
    return (
      <div className="flex items-center space-x-2 p-3 border rounded-lg bg-muted/50">
        <Input
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
          autoFocus
        />
        <Button size="icon" variant="ghost" onClick={handleUpdate}>
          <Check className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={onCancelEdit}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors">
      <div className="flex items-center space-x-3 flex-1">
        <Checkbox checked={todo.completed} onCheckedChange={() => onToggle(todo.id)} id={`todo-${todo.id}`} />
        <div className="flex flex-col">
          <label
            htmlFor={`todo-${todo.id}`}
            className={cn("font-medium cursor-pointer", todo.completed && "line-through text-muted-foreground")}
          >
            {todo.title}
          </label>
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
        </div>
      </div>
      <div className="flex space-x-1">
        <Button size="icon" variant="ghost" onClick={() => onEdit(todo.id)} disabled={todo.completed}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="text-destructive hover:text-destructive"
          onClick={() => onDelete(todo.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

