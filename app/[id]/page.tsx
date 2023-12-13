import supabase from "@/components/supabase"
import { notFound } from "next/navigation"
import React from "react"
import ClientCompforRealtimeSubcription from "./ClientCompforRealtimeSubcription"

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
      <ClientCompforRealtimeSubcription data={data} />
    </div>
  )
}

export default Page

// for realtime subcription we need to use client to run some function so heres how
// -> create a component make it as "use client"
// -> write the supabase subscription code in useEffect
// -> dont forgot to enable REALTIME SUBSCRIPTION FOR THE SPECFIC TABLE in supabase
// -> check ClientCompforRealtimeSubcription.tsx file on how to write it
