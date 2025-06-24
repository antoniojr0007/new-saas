"use client";

import { AlertCircle, FileText, Upload } from "lucide-react";
import type React from "react";
import { useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CsvRow = Record<string, string>;

interface CsvUploadProps {
  title: string;
  description: string;
  onFileUpload: (data: CsvRow[]) => void;
  expectedColumns: string[];
}

export function CsvUpload({
  title,
  description,
  onFileUpload,
  expectedColumns,
}: CsvUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (
        selectedFile.type !== "text/csv" &&
        !selectedFile.name.endsWith(".csv")
      ) {
        setError("Por favor, selecione um arquivo CSV válido.");
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const text = await file.text();
      const lines = text.split("\n").filter((line) => line.trim());

      if (lines.length < 2) {
        throw new Error(
          "O arquivo deve conter pelo menos um cabeçalho e uma linha de dados.",
        );
      }

      const headers = lines[0]
        .split(",")
        .map((h) => h.trim().replace(/"/g, ""));
      const data = lines.slice(1).map((line) => {
        const values = line.split(",").map((v) => v.trim().replace(/"/g, ""));
        const row: CsvRow = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || "";
        });
        return row;
      });

      // Validar se as colunas esperadas estão presentes
      const missingColumns = expectedColumns.filter(
        (col) => !headers.includes(col),
      );
      if (missingColumns.length > 0) {
        throw new Error(
          `Colunas obrigatórias não encontradas: ${missingColumns.join(", ")}`,
        );
      }

      onFileUpload(data);
      setFile(null);
      // Reset input
      const input = document.getElementById("csv-file") as HTMLInputElement;
      if (input) input.value = "";
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao processar o arquivo CSV.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="csv-file">Arquivo CSV</Label>
          <Input
            id="csv-file"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
        </div>

        {file && (
          <div className="bg-muted flex items-center gap-2 rounded-md p-2">
            <FileText className="h-4 w-4" />
            <span className="text-sm">{file.name}</span>
            <span className="text-muted-foreground ml-auto text-xs">
              {(file.size / 1024).toFixed(1)} KB
            </span>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label>Colunas esperadas no CSV:</Label>
          <div className="flex flex-wrap gap-1">
            {expectedColumns.map((column) => (
              <span
                key={column}
                className="bg-muted rounded-md px-2 py-1 text-xs"
              >
                {column}
              </span>
            ))}
          </div>
        </div>

        <Button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="w-full"
        >
          {isUploading ? "Processando..." : "Fazer Upload"}
        </Button>
      </CardContent>
    </Card>
  );
}
