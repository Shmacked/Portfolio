import React from 'react'
import axios from 'axios'
import type { AxiosResponse } from 'axios'

interface Repo {
    id: number;
    name: string;
    description?: string;
    html_url: string;
    languages: Array<Language> | null;
}

interface Language {
    language: string;
    percentage: number;
}

interface LanguageColors {
    [key: string]: string;
}

const MyRepos: React.FC = () => {
    const [repos, setRepos] = React.useState<Array<Repo>>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [languageColors, setLanguageColors] = React.useState<LanguageColors>({});

    const skeletons = Array.from({ length: 9 });

    React.useEffect(() => {
        setError(false);
        setLoading(true);
        setRepos([]);
        const colorMap: LanguageColors = {};
        const possibleColors = [
            'red',
            'green',
            'blue',
            'yellow',
            'purple',
            'orange',
            'pink',
            'brown',
            'gray',
            'black',
            'white',
            'cyan',
            'magenta',
            'lime',
            'teal',
            'indigo',
            'violet',
            'pink',
        ];

        const run = async () => {
            let reposResponse: AxiosResponse<Array<Repo>>;
            try {
                reposResponse = await axios.get<Repo[]>('https://api.github.com/users/Shmacked/repos')
            } catch (error) {
                setError(true);
                setLoading(false);
                return;
            }
            
            reposResponse.status !== 200 && setError(true);
            if (reposResponse.status !== 200) return;

            const baseRepos = reposResponse.data.map((r: Repo) => ({...r, languages: null as Repo["languages"]}));
            const reposWithLanguages = await Promise.all(
                baseRepos.map(async (repo) => {
                    try {
                        const langRes = await axios.get<Record<string, number>>(`https://api.github.com/repos/Shmacked/${repo.name}/languages`)
                        const entries = Object.entries(langRes.data);

                        if (entries.length === 0) return {...repo, languages: []}

                        const total = entries.reduce((acc, [, bytes]) => acc + bytes, 0);

                        entries.forEach(([language, _bytes]) => {
                            if (colorMap[language]) return;
                            const randomNumber = Math.floor(Math.random() * possibleColors.length);
                            colorMap[language] = possibleColors[randomNumber];
                            possibleColors.splice(randomNumber, 1);
                        });

                        return {...repo, languages: entries.map(([language, bytes]) => ({language, percentage: (bytes / total) * 100}))}
                    } catch {
                        return {...repo, languages: []}
                    }
                })
            );
            setRepos(reposWithLanguages);
            setLoading(false);
            setLanguageColors(colorMap);
        };
        run();
    }, [])


    return (
        <>
            {!loading && !error && Object.keys(languageColors).length > 0?
                <div className="flex flex-row mx-auto my-5 items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                    <ul className="flex flex-row gap-2">
                    {Object.keys(languageColors).map((language: string) => (
                        <li key={language} className="font-semibold" style={{color: languageColors[language]}}>
                            {language}
                        </li>
                    ))}
                    </ul>
                </div>:
                <></>
            }

            <div className="flex flex-col items-center justify-center w-full p-3 mx-auto">
                <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {loading? skeletons.map((_, i) => (
                        <div key={i} className='flex min-h-60 flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900'>
                            <div className="animate-pulse mb-3 h-6 w-2/3 rounded-md bg-zinc-200 dark:bg-zinc-700"></div>
                            <div className="animate-pulse mb-2 h-4 w-full rounded-md bg-zinc-200 dark:bg-zinc-700"></div>
                            <div className="animate-pulse mb-4 h-4 w-5/6 rounded-md bg-zinc-200 dark:bg-zinc-700"></div>
                            <div className="animate-pulse mt-auto h-9 w-28 roounded-lg bg-zinc-200 dark:bg-zinc-700"></div>
                        </div>
                    )):
                    error? <p className="text-red-500">Could not load repositories at this time.</p>:
                    repos.map((repo) => {
                        return (
                            <div key={repo.id} className="flex min-h-60 flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
                                <h2 className="mb-2 text-xl font-semibold">
                                    {repo.name}
                                </h2>
                                <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-300">
                                    {repo.description || 'No description'}
                                </p>
                                <div className="flex flex-col gap-2 mt-auto">
                                    <div className="flex h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700 border border-black dark:border-white">
                                    {repo.languages && repo.languages.sort((a, b) => b.percentage - a.percentage).map((language) => (
                                        <div
                                            key={language.language}
                                            className="h-full shrink-0"
                                            title={`${language.language} · ${Math.round(language.percentage)}%`}
                                            style={{width: `${language.percentage}%`, backgroundColor: languageColors[language.language]}}
                                        />
                                    ))}
                                    </div>
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                                    className="mt-auto inline-flex w-fit items-center rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white transition dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-green-500 transition-colors duration-300 hover:delay-700 hover:text-white hover:bg-green-500 dark:hover:bg-green-900">
                                        View on GitHub
                                    </a>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default MyRepos