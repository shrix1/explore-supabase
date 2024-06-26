import supabase from "@/components/supabase"
import Link from "next/link"

export const revalidate = 0 // isr = 60 || ssr = 0 (nextjs specific)

export default async function Home() {
  // Enable basic RLS policy to fetch data from Supabase
  const { data } = await supabase.from("explore").select("*")

  return (
    <main className=" flex justify-center items-center text-xl h-screen w-full">
      <ul className="flex flex-col gap-3">
        {data &&
          data.map((d) => (
            <Link
              key={d.id}
              href={`/${d.id}`}
              className="hover:text-sky-500 list-disc"
            >
              <li>{d.name}</li>
            </Link>
          ))}
      </ul>
    </main>
  )
}
