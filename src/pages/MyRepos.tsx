import React from 'react'
import axios from 'axios'

interface Repo {
    id: number;
    name: string;
    description?: string;
    html_url: string;
}

const MyRepos: React.FunctionComponent = () => {
    const [repos, setRepos] = React.useState<Array<Repo>>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    const skeletons = Array.from({ length: 9 });

    React.useEffect(() => {
        axios.get('https://api.github.com/users/Shmacked/repos')
        .then((response) => {
            setRepos(response.data);
        })
        .catch(() => {setError(true); setRepos([]);})
        .finally(() => setLoading(false));
    }, [])


    return (
        <section>
            <h1 className="mb-8 text-3xl font-bold tracking-tight">
                My Repos
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {loading? skeletons.map((_, i) => (
                    <article key={i} className='flex min-h-48 flex-col rounded-2xl border border-zinic-200 bg-white p-5 shadow-sm dark:border-zine-900'>
                        <div className="animate-pulse mb-3 h-6 w-2/3 rounded-md bg-zinc-200 dark:bg-zinc-700"></div>
                        <div className="animate-pulse mb-2 h-4 w-full rounded-md bg-zinc-200 dark:bg-zinc-700"></div>
                        <div className="animate-pulse mb-4 h-4 w-5/6 rounded-md bg-zinc-200 dark:bg-zinc-700"></div>
                        <div className="animate-pulse mt-auto h-9 w-28 roounded-lg bg-zinc-200 dark:bg-zinc-700"></div>
                    </article>
                )):
                error? <p className="text-red-500">Could not load repositories at this time.</p>:
                repos.map((repo) => {
                    return (
                        <article key={repo.id} className="flex min-h-48 flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
                            <h2 className="mb-2 text-xl font-semibold">
                                {repo.name}
                            </h2>
                            <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-300">
                                {repo.description || 'No description'}
                            </p>
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                            className="mt-auto inline-flex w-fit items-center rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
                                View on GitHub
                            </a>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}

export default MyRepos