import Editor from "@/components/Editor";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
export default async function Home() {
  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore);

  const { data } = await supabase.auth.getSession();
  console.log("user data is", data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data.user}
      <Editor />
    </main>
  );
}
