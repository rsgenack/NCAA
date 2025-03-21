"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Download } from "lucide-react"
import type { BracketData } from "@/lib/bracket-data"

interface ImportExportProps {
  brackets: { name: string; data: BracketData }[]
  onImport: (brackets: { name: string; data: BracketData }[]) => void
}

export default function ImportExport({ brackets, onImport }: ImportExportProps) {
  const [importData, setImportData] = useState("")
  const [importDialogOpen, setImportDialogOpen] = useState(false)

  const handleExport = () => {
    const dataStr = JSON.stringify(brackets, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)

    const link = document.createElement("a")
    link.href = url
    link.download = "ncaa_brackets.json"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleImport = () => {
    try {
      const data = JSON.parse(importData)
      onImport(data)
      setImportData("")
      setImportDialogOpen(false)
    } catch (error) {
      console.error("Failed to import data:", error)
      alert("Invalid JSON data. Please check your input.")
    }
  }

  return (
    <div className="flex gap-2">
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Brackets</DialogTitle>
            <DialogDescription>Paste your previously exported bracket JSON data below.</DialogDescription>
          </DialogHeader>
          <Textarea
            value={importData}
            onChange={(e) => setImportData(e.target.value)}
            placeholder="Paste JSON data here..."
            className="min-h-[200px]"
          />
          <DialogFooter>
            <Button onClick={handleImport}>Import</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button variant="outline" onClick={handleExport}>
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>
    </div>
  )
}

