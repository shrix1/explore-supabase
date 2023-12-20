"use client"
import React, { useRef } from "react"
import { createTodo } from "./actions"
import { toast } from "sonner"
import { TTodo } from "./TodoList"

const AddTodo = ({
  setTodoData,
}: {
  setTodoData: React.Dispatch<React.SetStateAction<TTodo[]>>
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputRef.current) {
      const todo = inputRef.current.value
      const { data } = await createTodo(todo)
      if (data) {
        toast.success(`${todo} Added`)
        setTodoData((prev) => [...prev, data])
        inputRef.current.value = ""
      } else {
        toast.error("Error Added Todo")
      }
    }
  }

  return (
    <form className="flex flex-col gap-2 w-[360px]" onSubmit={handleSubmit}>
      <input
        type="text"
        autoComplete="off"
        required
        ref={inputRef}
        placeholder="Do 1% everyday"
        className="p-2 w-full rounded-md bg-white/40 backdrop-blur-sm focus-visible:outline-none"
      />
      <button
        type="button"
        className="px-3 py-2 w-full font-bold rounded-md bg-sky-400 text-black"
      >
        Add
      </button>

      <p className="text-xs text-center">
        📌{" "}
        <span className="opacity-60">Hover to edit,delete,completed todo</span>
      </p>
    </form>
  )
}

export default AddTodo
