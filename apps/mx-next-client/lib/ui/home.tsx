import { ArrowRight, Box, Shield } from "lucide-react"
import { ThemeSwitcher } from "@components/theme-switcher"
import { Button } from "./button"
import { Logo } from "./logo-large"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <div className="flex justify-center">
              <Logo size="large" />
            </div>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
            Welcome to our new platform, built to grow with your business.
          </p>
          <div className="mt-24 grid md:grid-cols-1 gap-8 text-left">
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-xl font-semibold mb-2">Existing Users</h3>
              <p className="text-muted-foreground">
                Import your account and start using the new platform.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-xl font-semibold mb-2">New Users</h3>
              <p className="text-muted-foreground">
                Start using a modern platform with a free trial.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}