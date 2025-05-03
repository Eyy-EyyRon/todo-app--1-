"use client"

import type { Todo } from "@/components/todo-app"
import TodoItem from "@/components/todo-item"

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string) => void
  onUpdate: (id: string, title: string) => void
  onCancelEdit: () => void
  editingTodoId: string | null
}

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
  onUpdate,
  onCancelEdit,
  editingTodoId,
}: TodoListProps) {
  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onUpdate={onUpdate}
          onCancelEdit={onCancelEdit}
          isEditing={editingTodoId === todo.id}
        />
      ))}
    </div>
  )
}

