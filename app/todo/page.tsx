import React from "react"
import TodoList, { TTodo } from "./TodoList"
import AddTodo from "./AddTodo"
import supabase from "@/components/supabase"

export const revalidate = 0

async function getTodo() {
  const { data } = await supabase.from("todo").select("*")
  return data as TTodo[]
}

const Page = async () => {
  const data = await getTodo()

  return (
    <div className="w-full h-screen grid place-content-center">
      <h1 className="py-2 text-center text-xl">TODO</h1>
      <AddTodo />
      <TodoList data={data} />
    </div>
  )
}

export default Page
