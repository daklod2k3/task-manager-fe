"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import PageHeader from "./page-header";

interface Props {
  children?: React.ReactNode;
}

export default function BuildBreadcrumb({ children }: Props) {
  const pathname = usePathname();
  const pathList = pathname
    .split("/")
    .filter((path) => path !== "")
    .map((path) => path[0].toUpperCase() + path.slice(1));
  console.log(pathList);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {pathList.map((item) => (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem key={item}>
              <BreadcrumbLink href={"/" + item.toLowerCase()}>
                {item}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ))}
      </BreadcrumbList>
      <PageHeader>{children || pathList[pathList.length - 1]}</PageHeader>
    </Breadcrumb>
  );
}
