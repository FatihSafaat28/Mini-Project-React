import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HomepageLayout from "@/pages/homepage/layout";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [userData, setUserData] = useState<any>([]);
  const getUserData = async (id: number) => {
    const data = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres_746dd67bd84f4cab98b82566173afb71",
      },
    });
    const result = await data.json();
    setUserData(result.data);
  };
  useEffect(() => {
    if (id) {
      getUserData(Number(id));
    }
  }, [id]);

  const breadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/homepage">List User</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>User {id}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
  return (
    <HomepageLayout breadcrumb={breadcrumb}>
      <div className="flex flex-row gap-8">
        <Avatar className="h-32 w-32 rounded-lg grayscale">
          <AvatarImage src={userData.avatar} alt={userData.first_name} />
          <AvatarFallback className="rounded-lg"></AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center gap-2">
          <h1 className="text-4xl font-bold">
            {userData.first_name} {userData.last_name}
          </h1>
          <p className="text-lg text-gray-500">
            <strong>Email:</strong> {userData.email}
          </p>
          <p className="text-lg">
            <strong>ID:</strong> {userData.id}
          </p>
        </div>
      </div>
    </HomepageLayout>
  );
}
