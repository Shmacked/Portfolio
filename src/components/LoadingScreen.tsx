import React from 'react'

export interface LoadingScreenProps {
    appState: string;
    fadingMinMs: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({appState, fadingMinMs}) => {
    return (
        <>
            {appState !== 'loaded'? (
                <div className={appState === 'loading' ? 'opacity-100' : `opacity-0 transition-opacity ease-in-out`} style={{transitionDuration: `${fadingMinMs}ms`}}>
                    <div className="min-h-[100svh] flex items-center justify-center bg-white dark:bg-zinc-950 fixed inset-0 z-[100]">
                        <div className="text-center">
                            <div className="text-sm uppercase tracking-widest text-zinc-500 dark:text-zinc-400 animate-pulse">
                            A Sincere Welcome From
                            </div>
                            <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                            Shane
                            </h1>
                            <p className="mt-4 text-zinc-600 dark:text-zinc-300 animate-pulse">
                            Loading…
                            </p>
                        </div>
                    </div>
                </div>
            ): (
                <></>
            )}
        </>
    )
}

export default LoadingScreen;