import { Heart } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t-2 border-dashed border-border/40 bg-background">
      <div className="mx-auto max-w-7xl border-dashed border-x-2 px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">© {currentYear} ASIA API PROJECT. All rights reserved.</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm font-medium mb-1">Group Members</p>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-1">
              <span className="text-xs text-muted-foreground">AJ Castillo</span>
              <span className="text-xs text-muted-foreground">MJ Arada</span>
              <span className="text-xs text-muted-foreground">JC Caliguid</span>
              <span className="text-xs text-muted-foreground">Joseph Oliver</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center">
              Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> by Team Cutis
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
