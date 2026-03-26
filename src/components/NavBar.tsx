import React from 'react'
import { NavLink } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'

const NavBar: React.FunctionComponent = () => {
    const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'light')
    React.useEffect(() => {
        const root = document.documentElement
        if (theme === 'dark') root.classList.add('dark')
        else root.classList.remove('dark')
        localStorage.setItem('theme', theme)
      }, [theme])

    return (
        <nav className="sticky top-0 z-50 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <NavLink to="/" end className={({isActive}) => isActive ?
                    "text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100":
                    "text-2xl font-bold tracking-tight text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }>
                    Home
                </NavLink>
                <span className="flex items-center gap-4">
                    <NavLink to="/about" end className={({isActive}) => isActive ?
                        "text-sm font-medium text-zinc-900 dark:text-zinc-100":
                        "text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }>
                        About Me
                    </NavLink>
                    <NavLink to="/my-repos" end className={({isActive}) => isActive ?
                        "text-sm font-medium text-zinc-900 dark:text-zinc-100":
                        "text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }>
                        My Github Repos
                    </NavLink>
                    
                    <span>
                        {theme === 'dark'?
                        <Moon className="h-5 w-5 hover:[&>path]:[animation:moon-stroke-fade_1.4s_ease-in-out_infinite]" onClick={() => setTheme('light')} />:
                        <Sun className="h-5 w-5 transition-transform hover:animate-spin hover:[animation-duration:1.5s] hover:[animation-iteration-count:infinite]" onClick={() => setTheme('dark')} />
                        }
                    </span>
                </span>
            </div>
        </nav>
    )
}

export default NavBar