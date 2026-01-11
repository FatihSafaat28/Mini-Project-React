import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  Select,
} from "../ui/select";
import { Label } from "../ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "../ui/pagination";

interface TabelPaginationProps {
  rowsPerPage: string;
  setRowsPerPage: (value: string) => void;
  totalPages: number;
  pages: string;
  setPages: (value: string) => void;
}

const TabelPagination = ({
  rowsPerPage,
  setRowsPerPage,
  totalPages,
  pages,
  setPages,
}: TabelPaginationProps) => {
  const arrayPagination = [];
  for (let i = 0; i < totalPages; i++) {
    arrayPagination.push(`${i + 1}`);
  }
  return (
    <div className="flex w-full justify-end items-center gap-8">
      <div className=" items-center gap-2 flex">
        <Label
          htmlFor="rows-per-page"
          className="text-sm font-medium whitespace-nowrap"
        >
          Rows per page
        </Label>
        <Select
          value={rowsPerPage}
          onValueChange={(value) => {
            setRowsPerPage(value);
            setPages("1");
          }}
        >
          <SelectTrigger size="sm" className="w-20" id="rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="9">9</SelectItem>
              <SelectItem value="12">12</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Pagination>
          <PaginationContent>
            <PaginationPrevious
              onClick={() => {
                if (parseInt(pages) > 1) {
                  setPages(`${parseInt(pages) - 1}`);
                }
              }}
            />

            {arrayPagination.map((item) => (
              <PaginationItem key={item}>
                <PaginationLink
                  isActive={pages == item}
                  onClick={() => setPages(item)}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationNext
              onClick={() => {
                if (parseInt(pages) < totalPages) {
                  setPages(`${parseInt(pages) + 1}`);
                }
              }}
            />
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
export default TabelPagination;
