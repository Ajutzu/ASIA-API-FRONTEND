"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink, Star, GitFork, Code, Eye, Clock, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Repository {
  name: string
  description: string
  url: string
  stars: number
  forks: number
  language: string
  owner: string
  watchers: number
}

export function RepositoryDialog() {
  const repositories: Record<string, Repository> = {
    frontend: {
      name: "ASIA-API-FRONTEND",
      description: "A analytics dashboard frontend application built with Next.js and TailwindCSS",
      url: "https://github.com/Ajutzu/ASIA-API-FRONTEND",
      stars: 0,
      forks: 0,
      language: "TypeScript",
      owner: "AJ Castillo",
      watchers: 1,
    },
    backend: {
      name: "ASIA-API-BACKEND",
      description: "Smooth backend API with Node.js, Express, and MYSQL",
      url: "https://github.com/Ajutzu/ASIA-API-BACKEND",
      stars: 0,
      forks: 0,
      language: "JavaScript",
      owner: "Aj Castillo",
      watchers: 1,
    },
  }

  const languageColors: Record<string, string> = {
    TypeScript: "bg-blue-500",
    JavaScript: "bg-yellow-400",
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 transition-all hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50"
        >
          <Github className="h-4 w-4" />
          Repositories
          <ChevronRight className="h-3 w-3 opacity-50" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            <span className="bg-clip-text">
              Project Repositories
            </span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="frontend" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="frontend">Frontend</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
          </TabsList>

          {["frontend", "backend"].map((type) => (
            <TabsContent key={type} value={type} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-semibold">{repositories[type].name}</h3>
                    <p className="text-sm text-muted-foreground">{repositories[type].description}</p>
                  </div>
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={`/profile.png?height=40&width=40`} alt="Repository avatar" />
                    <AvatarFallback>{type[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <div className={`h-2 w-2 rounded-full ${languageColors[repositories[type].language]}`}></div>
                    {repositories[type].language}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {repositories[type].stars}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" />
                    {repositories[type].forks}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {repositories[type].watchers}
                  </Badge>
                </div>

                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  Repository Owner {repositories[type].owner}
                </div>

                <div className="mt-5 flex gap-3">
                  <Button className="flex-1 gap-2" asChild>
                    <a href={repositories[type].url} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      View Repository
                    </a>
                  </Button>
                  <Button variant="outline" className="gap-2" asChild>
                    <a href={`${repositories[type].url}/issues`} target="_blank" rel="noopener noreferrer">
                      <Code className="h-4 w-4" />
                      Issues
                    </a>
                  </Button>
                </div>
              </motion.div>

              <div className="flex items-center justify-between text-sm">
                <p className="text-muted-foreground">
                  {type === "frontend" ? "UI/UX components and pages" : "API endpoints and database models"}
                </p>
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <a href={`${repositories[type].url}/blob/main/README.md`} target="_blank" rel="noopener noreferrer">
                    Documentation
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
