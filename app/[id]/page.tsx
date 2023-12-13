import supabase from "@/components/supabase"
import { notFound } from "next/navigation"
import React from "react"

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const { data } = await supabase
    .from("explore")
    .select("*")
    .eq("id", id) // or .match({id})
    .single() // means => {} not this [{}]

  if (!data) {
    notFound()
  }

  return (
    <div className="text-2xl flex justify-center items-center h-screen">
      <h1 className="hover:bg-sky-500 hover:text-black p-2">{data.name}</h1>
    </div>
  )
}

export default Page
