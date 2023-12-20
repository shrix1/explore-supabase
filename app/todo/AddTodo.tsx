"use client"
import React, { useRef } from "react"
import { createTodo } from "./actions"
import { toast } from "sonner"

const AddTodo = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputRef.current) {
      const todo = inputRef.current.value
      const res = await createTodo(todo)
      if (res.status === 201) {
        toast.success(`${todo} Added`)
        inputRef.current.value = ""
      } else {
        toast.error("Error Added Todo")
      }
    }
  }

  return (
    <form className="flex flex-col gap-2 w-[300px]" onSubmit={handleSubmit}>
      <input
        type="text"
        autoComplete="off"
        required
        ref={inputRef}
        placeholder="Do 1% everyday"
        className="p-2 w-full rounded-sm bg-white/30 backdrop-blur-sm focus-visible:outline-none"
      />
      <button
        type="button"
        className="px-3 py-1 font-bold rounded-sm bg-sky-400 text-black"
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
