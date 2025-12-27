import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@radix-ui/react-separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import TabelPagination from "@/components/pagination";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function Homepage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [userLoginData, setUserLoginData] = useState<any>({
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  });

  const [userListData, setUserListData] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = useState<any>("6");

  const [totalPages, setTotalPages] = useState<number>(0);
  const [pages, setPages] = useState<any>("1");

  useEffect(() => {
    // cek token di localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("./");
    } else {
      getLoginData();
    }
  }, []);

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
    const userLoginData = result.data.filter(
      (array: { email: string }) => array.email == emailcheck
    )[0];
    setUserLoginData(userLoginData);
  };

  const getUserListData = async (rowsPerPage: string, pages: string) => {
    const data = await fetch(
      `https://reqres.in/api/users?page=${pages}&per_page=${rowsPerPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "reqres_746dd67bd84f4cab98b82566173afb71",
        },
      }
    );
    const result = await data.json();
    setUserListData(result.data);
    const totalPages = result.total_pages;
    setTotalPages(totalPages);
  };

  useEffect(() => {
    getUserListData(rowsPerPage, pages);
  }, [rowsPerPage, pages]);

  return (
    <main>
      <SidebarProvider>
        <AppSidebar data={userLoginData} />
        <main className="w-full">
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Get User Data</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>List User</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>
          </SidebarInset>
          <div className="flex flex-1 flex-col">
            <div className=" flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-25">ID</TableHead>
                      <TableHead>Avatar</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Email</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userListData.map((item: any) => (
                      <Dialog key={item.id}>
                        <DialogTrigger asChild>
                          <TableRow className="cursor-pointer">
                            <TableCell className="font-medium">
                              {item.id}
                            </TableCell>
                            <TableCell>
                              <Avatar className="h-8 w-8 rounded-lg grayscale">
                                <AvatarImage
                                  src={item.avatar}
                                  alt={item.first_name}
                                />
                                <AvatarFallback className="rounded-lg">
                                  CN
                                </AvatarFallback>
                              </Avatar>
                            </TableCell>
                            <TableCell>
                              {item.first_name} {item.last_name}
                            </TableCell>
                            <TableCell className="text-right">
                              {item.email}
                            </TableCell>
                          </TableRow>
                        </DialogTrigger>

                        <DialogContent>
                          <div className="flex flex-row gap-4">
                            <Avatar className="h-32 w-32 rounded-lg grayscale">
                              <AvatarImage
                                src={item.avatar}
                                alt={item.first_name}
                              />
                              <AvatarFallback className="rounded-lg">
                                CN
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col justify-center gap-2 py-4 pr-2">
                              <DialogHeader>
                                <DialogTitle>
                                  {item.first_name} {item.last_name}
                                </DialogTitle>
                              </DialogHeader>
                              <div className="space-y-2 w-fit">
                                <p className="w-fit">
                                  <strong>ID :</strong> {item.id}
                                </p>
                                <p className="w-fit">
                                  <strong>Email :</strong> {item.email}
                                </p>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </TableBody>
                </Table>
                {TabelPagination(
                  rowsPerPage,
                  setRowsPerPage,
                  totalPages,
                  pages,
                  setPages
                )}
              </div>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </main>
  );
}
