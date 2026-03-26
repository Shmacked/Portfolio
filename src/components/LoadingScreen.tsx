import React from 'react'

const LoadingScreen: React.FC = () => {
    return (
        <div className="min-h-[100svh] flex items-center justify-center bg-white dark:bg-zinc-950">
          <div className="text-center">
            <div className="text-sm uppercase tracking-widest text-zinc-500 dark:text-zinc-400 animate-pulse">
              Welcome
            </div>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Shmacked
            </h1>
            <p className="mt-4 text-zinc-600 dark:text-zinc-300 animate-pulse">
              Loading…
            </p>
          </div>
        </div>
      )
}

export default LoadingScreen;