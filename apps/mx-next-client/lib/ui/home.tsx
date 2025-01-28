import { ArrowRight, Box, Shield } from "lucide-react"
import { ThemeSwitcher } from "@components/theme-switcher"
import { Button } from "./button"
import Logo from "./logo"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Logo />
            <ThemeSwitcher />
        </div>
      </header>

      <main>
        <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Your All-in-One
            <span className="text-primary block">Business Solution</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
            Streamline your workflow, boost productivity, and scale your business with our comprehensive platform designed for modern teams.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
      <Button asChild size="lg" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
            <Button size="lg" variant="outline">
              Log In
            </Button>
          </div>

          <div className="mt-24 grid md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-lg border bg-card">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
              <p className="text-muted-foreground">
                Bank-grade security with end-to-end encryption and advanced access controls.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <Box className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Scalable Solution</h3>
              <p className="text-muted-foreground">
                Built to grow with your business, from startup to enterprise scale.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <ArrowRight className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">
                Round-the-clock support from our dedicated team of experts.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t mt-24">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © 2025 Mixshift. All rights reserved.
        </div>
      </footer>
    </div>
  )
}