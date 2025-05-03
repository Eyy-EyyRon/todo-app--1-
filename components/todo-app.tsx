"use client"

import { useState, useEffect } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TodoList from "@/components/todo-list"
import TodoForm from "@/components/todo-form"

export type Todo = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isAddingTodo, setIsAddingTodo] = useState(false)
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null)

  // Load todos from localStorage on initial render
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos")
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos)
        // Convert string dates back to Date objects
        const todosWithDates = parsedTodos.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
        }))
        setTodos(todosWithDates)
      } catch (error) {
        console.error("Failed to parse todos from localStorage", error)
      }
    }
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date(),
    }
    setTodos([newTodo, ...todos])
    setIsAddingTodo(false)
  }

  const updateTodo = (id: string, title: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title } : todo)))
    setEditingTodoId(null)
  }

  const toggleTodoStatus = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const startEditing = (id: string) => {
    setEditingTodoId(id)
  }

  const cancelEditing = () => {
    setEditingTodoId(null)
  }

  const cancelAdding = () => {
    setIsAddingTodo(false)
  }

  return (
    <Card className="shadow-lg border-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold text-center">Todo List</CardTitle>
      </CardHeader>
      <CardContent>
        {isAddingTodo ? (
          <TodoForm onSubmit={addTodo} onCancel={cancelAdding} buttonText="Add Todo" />
        ) : (
          <Button onClick={() => setIsAddingTodo(true)} className="w-full mb-4" size="lg">
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New Todo
          </Button>
        )}

        <TodoList
          todos={todos}
          onToggle={toggleTodoStatus}
          onDelete={deleteTodo}
          onEdit={startEditing}
          onUpdate={updateTodo}
          onCancelEdit={cancelEditing}
          editingTodoId={editingTodoId}
        />

        {todos.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No todos yet. Add one to get started!</div>
        )}
      </CardContent>
    </Card>
  )
}

