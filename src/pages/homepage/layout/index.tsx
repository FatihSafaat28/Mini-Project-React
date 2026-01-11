import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";

interface HomepageLayoutProps {
  children: React.ReactNode;
  breadcrumb: React.ReactNode;
}

export default function HomepageLayout({
  children,
  breadcrumb,
}: HomepageLayoutProps) {
  const router = useRouter();
  const [userLoginData, setUserLoginData] = useState<any>({
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  });
  const [sidebarGroupItem, setSidebarGroupItem] = useState<any>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/");
    } else {
      getLoginData();
    }
  }, [router]);

  const getLoginData = async () => {
    const data = await fetch("https://reqres.in/api/users?per_page=12", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres_746dd67bd84f4cab98b82566173afb71",
      },
    });
    const result = await data.json();
    const emailcheck = localStorage.getItem("userEmail");
    const userLoginData = result.data.find(
      (item: any) => item.email === emailcheck
    );
    setUserLoginData(userLoginData);
    setSidebarGroupItem(result.data);
  };

  return (
    <main>
      <SidebarProvider>
        <AppSidebar user={userLoginData} sidebarGroupItem={sidebarGroupItem} />
        <main className="w-full">
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              {breadcrumb}
            </header>
          </SidebarInset>
          <div className="flex flex-1 flex-col">
            <div className=" flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6">
                {children}
              </div>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </main>
  );
}
