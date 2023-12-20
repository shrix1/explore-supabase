"use server"

import supabase from "@/components/supabase"

export const getTodo = async () => {
  return await supabase.from("todo").select("*")
}

export const createTodo = async (todo: string) => {
  return await supabase.from("todo").insert({ todo }).select("*").single()
}

export const deleteTodo = async (id: string) => {
  return await supabase.from("todo").delete().eq("id", id).select("*").single()
}

export const markCompleted = async (id: string, completed: boolean) => {
  return await supabase
    .from("todo")
    .update({ completed })
    .eq("id", id)
    .select("*")
    .single()
}

export const updateTodo = async (id: string, todo: string) => {
  return await supabase
    .from("todo")
    .update({ todo, edited: true })
    .eq("id", id)
    .select("*")
    .single()
}
