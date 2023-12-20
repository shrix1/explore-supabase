"use client"
import React, { useState } from "react"
import { deleteTodo, markCompleted, updateTodo } from "./actions"
import { toast } from "sonner"
import AddTodo from "./AddTodo"

export type TTodo = {
  id: string
  created_at: string
  todo: string
  completed: boolean
  edited: boolean
}

const TodoList = ({ data }: { data: TTodo[] }) => {
  const [todoData, setTodoData] = useState<TTodo[]>(data)
  const [editId, setEditId] = useState<string | null>(null)
  const [editTodo, setEditTodo] = useState<string>("")

  const handleDelete = async (id: string) => {
    const { data } = await deleteTodo(id)
    if (data) {
      toast.info("Deleted Successfully")
      setTodoData((prev) => prev.filter((todo) => todo.id !== id))
    } else {
      toast.error("Can't Delete")
    }
  }

  const handleCompleted = async (id: string, completed: boolean) => {
    const { data } = await markCompleted(id, !completed)
    if (data) {
      if (!data.completed) {
        toast.info("Marked as UnCompleted")
        setTodoData((prev) =>
          prev.map((todo) =>
            todo.id === id ? { ...todo, completed: false } : todo
          )
        )
      } else {
        toast.info("Marked as Completed Successfully")
        setTodoData((prev) =>
          prev.map((todo) =>
            todo.id === id ? { ...todo, completed: true } : todo
          )
        )
      }
    } else {
      toast.error("Can't Mark as Completed")
    }
  }

  const handleUpdateTodo = async (
    e: React.FormEvent,
    id: string,
    todo: string
  ) => {
    e.preventDefault()
    const { data } = await updateTodo(id, todo)
    if (data) {
      toast.info("Edited Successfully")
      setTodoData((prev) =>
        prev.map((t) => (t.id === id ? { ...t, todo, edited: true } : t))
      )
      setEditId(null)
    } else {
      toast.error("Can't Edit and Update in DB")
    }
  }

  if (todoData.length === 0) {
    return (
      <>
        <AddTodo setTodoData={setTodoData} />
        <h3 className="text-center py-10">
          📝 <span className="opacity-60">Add todo</span>
        </h3>
      </>
    )
  }

  return (
    <>
      <AddTodo setTodoData={setTodoData} />
      <ul className="py-4 flex gap-1 flex-col">
        {todoData.map((t) => {
          return (
            <li
              key={t.id}
              className={`group ${
                t.completed ? "bg-green-400/50" : "bg-white/30"
              } backdrop-blur-md rounded-sm flex justify-between`}
            >
              {editId === t.id ? (
                <form
                  className="flex justify-between w-full p-1"
                  onSubmit={(e) =>
                    editId !== null && handleUpdateTodo(e, t.id, editTodo)
                  }
                >
                  <input
                    type="text"
                    className="bg-transparent p-1 border"
                    value={editTodo}
                    onChange={(e) => setEditTodo(e.target.value)}
                  />
                  <button type="submit">Done</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </form>
              ) : (
                <>
                  <span className="p-2">
                    {t.todo}
                    {t.edited ? (
                      <span className="opacity-30 text-xs">(edited)</span>
                    ) : null}
                  </span>
                  <div className="flex gap-2 invisible group-hover:visible">
                    <button
                      className="px-2 hover:bg-white/20"
                      onClick={() => {
                        setEditTodo(t.todo)
                        setEditId(t.id)
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      className="px-2 hover:bg-white/20"
                      onClick={() => handleCompleted(t.id, t.completed)}
                    >
                      ✅
                    </button>
                    <button
                      className="px-2 hover:bg-white/20"
                      onClick={() => handleDelete(t.id)}
                    >
                      ❌
                    </button>
                  </div>
                </>
              )}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default TodoList
