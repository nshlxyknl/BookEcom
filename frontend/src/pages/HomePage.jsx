import React from 'react'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (<>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col justify-center items-center text-center min-h-screen">
        <h1 className="text-4xl font-bold text-foreground mb-6 text-balance">Welcome to Readme App</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          Get started by signing in to your account or create a new one to begin your journey with us.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/register">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started
            </Button>
          </Link>
          <Button asChild variant="outline" size="lg">
          <a href='#f'> Learn More </a> 
          </Button>
        </div>
      </div>
    </main>
    </>
  )
}
