import TodoApp from "@/components/todo-app"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <TodoApp />
      </div>
    </main>
  )
}

