"use client"
import supabase from "@/components/supabase"
import {
  RealtimePostgresChangesPayload,
  REALTIME_LISTEN_TYPES,
} from "@supabase/supabase-js"
import React, { useEffect, useState } from "react"

type TData = {
  id: string
  created_id: string
  name: string
}

const ClientCompforRealtimeSubcription = ({ data }: { data: TData }) => {
  const [newData, setNewData] = useState(data.name)

  useEffect(() => {
    const realtimeData = supabase
      .channel("realtime_data_updates") // Name it whatever you want but it should be **unique**
      .on(
        // @ts-expect-error
        REALTIME_LISTEN_TYPES.POSTGRES_CHANGES, // we are using postgres so i added this .your doing insert operation you can add INSERT
        {
          event: "UPDATE", // INSERT DELETE or ["INSERT", "DELETE" , "UPDATE"]
          scheme: "public", // scheme type
          table: "explore", // table name
          filter: `id=eq.${data.id}`, // OPTIONAL Just we are saying we only care about the data.id value change (BEST PARCTICE)
        },
        (payload: RealtimePostgresChangesPayload<any>) => {
          // payload callback to return new / old data
          setNewData(payload.new.name) // store it in a variable paint it in UI
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(realtimeData) // unmount
    }
  }, [])
  return <h1 className="hover:bg-sky-500 hover:text-black p-2">{newData}</h1>
}

export default ClientCompforRealtimeSubcription
