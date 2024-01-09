import EditorClientView from "@/components/EditorClientView";
import { deserializeDocument } from "@/utils/documents_service";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
const Page = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let { data: documents, error } = await supabase
    .from("documents")
    .select()
    .eq("id", 2);

  if (error)
    return (
      <>
        There was an error:
        <div className="flex flex-col">
          <div>{error.message}</div>
        </div>
      </>
    );

  const content = JSON.parse(documents[0].content);
  const deserializedData = deserializeDocument(content);

  return (
    <>
      {deserializedData && (
        <EditorClientView documentsData={deserializedData} />
      )}
    </>
  );
};

export default Page;
