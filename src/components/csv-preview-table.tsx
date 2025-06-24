"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type CsvRow = Record<string, string>;

interface CsvPreviewTableProps {
  data: CsvRow[];
  title?: string;
  maxRows?: number;
}

export function CsvPreviewTable({
  data,
  title = "Preview dos Dados",
  maxRows = 10,
}: CsvPreviewTableProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Nenhum dado para exibir</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const headers = Object.keys(data[0]);
  const displayData = data.slice(0, maxRows);
  const hasMoreRows = data.length > maxRows;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          <Badge variant="secondary">
            {data.length} registro{data.length !== 1 ? "s" : ""}
          </Badge>
        </CardTitle>
        {hasMoreRows && (
          <CardDescription>
            Exibindo {maxRows} de {data.length} registros
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="overflow-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {headers.map((header) => (
                  <TableHead key={header} className="whitespace-nowrap">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.map((row, index) => (
                <TableRow key={index}>
                  {headers.map((header) => (
                    <TableCell key={header} className="whitespace-nowrap">
                      {row[header] || "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
