import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TabelPagination from "@/components/pagination";
import HomepageLayout from "@/components/HomepageLayout";
import { useRouter } from "next/router";

export default function Homepage() {
  const router = useRouter();
  const [userListData, setUserListData] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = useState<any>("6");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pages, setPages] = useState<any>("1");

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
    const token = localStorage.getItem("token");
    if (token) {
      getUserListData(rowsPerPage, pages);
    }
  }, [rowsPerPage, pages]);

  const handleRowClick = (id: number) => {
    router.push(`/homepage/${id}`);
  };

  const breadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>List User</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  return (
    <HomepageLayout breadcrumb={breadcrumb}>
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
            <TableRow
              key={item.id}
              className="cursor-pointer"
              onClick={() => handleRowClick(item.id)}
            >
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>
                <Avatar className="h-8 w-8 rounded-lg grayscale">
                  <AvatarImage src={item.avatar} alt={item.first_name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>
                {item.first_name} {item.last_name}
              </TableCell>
              <TableCell className="text-right">{item.email}</TableCell>
            </TableRow>
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
    </HomepageLayout>
  );
}
