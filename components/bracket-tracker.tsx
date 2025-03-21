"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Save, Brain, Award } from "lucide-react"
import BracketView from "@/components/bracket-view"
import { initialBracketData, type BracketData } from "@/lib/bracket-data"

export default function BracketTracker() {
  const [brackets, setBrackets] = useState<{ name: string; data: BracketData }[]>([
    { name: "Actual Results", data: initialBracketData() },
  ])
  const [activeTab, setActiveTab] = useState("Actual Results")
  const [newBracketName, setNewBracketName] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const addNewBracket = () => {
    if (newBracketName.trim() === "") return

    setBrackets([
      ...brackets,
      {
        name: newBracketName,
        data: initialBracketData(),
      },
    ])
    setActiveTab(newBracketName)
    setNewBracketName("")
    setDialogOpen(false)
  }

  const updateBracket = (name: string, updatedData: BracketData) => {
    setBrackets(brackets.map((bracket) => (bracket.name === name ? { ...bracket, data: updatedData } : bracket)))
  }

  const exportBrackets = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(brackets))
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "ncaa_brackets.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 bracket-title">YOUR BRACKETS</h2>
        <div className="flex gap-2">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Brain className="mr-2 h-4 w-4" />
                Add AI Bracket
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl bracket-title">ADD NEW AI BRACKET</DialogTitle>
                <DialogDescription>Enter a name for the AI prediction bracket you want to track.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newBracketName}
                    onChange={(e) => setNewBracketName(e.target.value)}
                    className="col-span-3"
                    placeholder="e.g., GPT-4 Predictions"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={addNewBracket} className="bg-primary hover:bg-primary/90">
                  Add Bracket
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={exportBrackets}>
            <Save className="mr-2 h-4 w-4" />
            Export Brackets
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start overflow-auto">
          {brackets.map((bracket) => (
            <TabsTrigger key={bracket.name} value={bracket.name} className="min-w-[150px] bracket-title text-lg">
              {bracket.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {brackets.map((bracket) => (
          <TabsContent key={bracket.name} value={bracket.name} className="mt-4">
            <Card className="border shadow-sm">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-2xl text-primary bracket-title flex items-center">
                  {bracket.name === "Actual Results" ? (
                    <>
                      <Award className="mr-2 h-5 w-5" />
                      {bracket.name}
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-5 w-5" />
                      {bracket.name}
                    </>
                  )}
                </CardTitle>
                <CardDescription>
                  {bracket.name === "Actual Results"
                    ? "Track the actual tournament results here"
                    : `Predictions from ${bracket.name}`}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 bg-white">
                <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                  <BracketView
                    bracketData={bracket.data}
                    onUpdate={(updatedData) => updateBracket(bracket.name, updatedData)}
                  />
                </ScrollArea>
              </CardContent>
              <CardFooter className="border-t pt-4 bg-gray-50">
                <div className="text-sm font-medium text-primary flex items-center">
                  <Award className="mr-2 h-4 w-4" />
                  Score: {calculateScore(bracket.data, brackets[0].data)} points
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function calculateScore(bracketData: BracketData, actualData: BracketData): number {
  // Simple scoring: 1 point for first round, 2 for second, etc.
  const score = 0

  // This is a placeholder scoring function
  // In a real implementation, you would compare each matchup in each round

  return score
}

