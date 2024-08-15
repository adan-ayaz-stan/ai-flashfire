"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Chapter from "./Chapter";
import { getAllChapters } from "@/server/actions/chapters.action";

export default function AllChapters({ book_id }: { book_id: string }) {
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["chapter", "all"],
    queryFn: () => getAllChapters(book_id),
    initialData: [
      {
        id: "cellitscomponents-user_2ZiyRhtpdUVa6oKLVNoASqRCt0x-1723712470505",
        book_id: "biology_2-user_2ZiyRhtpdUVa6oKLVNoASqRCt0x-1723712470505",
        createdAt: 1723715843845,
        slug: "cellitscomponents-user_2ZiyRhtpdUVa6oKLVNoASqRCt0x-1723715843845",
        title: "Cell & It's Components",
        updatedAt: 1723715843845,
        userId: "user_2ZiyRhtpdUVa6oKLVNoASqRCt0x",
      },
      {
        id: "moleculesandcompounds-user_4XKjpjVPDAVB6pMleVfGtRlOx-1723712470506",
        book_id: "chemistry_3-user_4XKjpjVPDAVB6pMleVfGtRlOx-1723712470506",
        createdAt: 1723715844845,
        slug: "moleculesandcompounds-user_4XKjpjVPDAVB6pMleVfGtRlOx-1723715844845",
        title: "Molecules and Compounds",
        updatedAt: 1723715844845,
        userId: "user_4XKjpjVPDAVB6pMleVfGtRlOx",
      },
      {
        id: "mechanics-user_K3dqoLVRPwW9pGtOx-1723712470507",
        book_id: "physics_1-user_K3dqoLVRPwW9pGtOx-1723712470507",
        createdAt: 1723715845845,
        slug: "mechanics-user_K3dqoLVRPwW9pGtOx-1723715845845",
        title: "Mechanics",
        updatedAt: 1723715845845,
        userId: "user_K3dqoLVRPwW9pGtOx",
      },
    ],
  });

  if (isLoading) {
    return (
      <div className="p-8 w-fit m-auto flex rounded-xl bg-coolWhite">
        <Loader className="animate-spin w-8 h-8 m-auto" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full border-2 border-red-600 flex flex-col items-center justify-center">
        <p>Something went wrong</p>
        <pre className="text-sm">{error.message}</pre>
      </div>
    );
  }

  if (isSuccess && data.length == 0) {
    return <div className="w-full">No chapters found.</div>;
  }

  return (
    <div className="w-full flex flex-row flex-wrap gap-4">
      {isSuccess &&
        data.map((ele) => {
          return <Chapter key={ele.id} data={ele} />;
        })}
    </div>
  );
}
