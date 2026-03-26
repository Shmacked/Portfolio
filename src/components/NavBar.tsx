import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar: React.FunctionComponent = () => {
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
                </span>
            </div>
        </nav>
    )
}

export default NavBar