import React from 'react'
import axios from 'axios'
import type { AxiosResponse } from 'axios'

interface Repo {
    id: number;
    name: string;
    description?: string;
    html_url: string;
    languages: Array<Language> | null;
    toggle: boolean; // whether the description is shown or the languages are shown
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
    const [hoveredByRepo, setHoveredByRepo] = React.useState<Record<number, { language: string | null, type: "bar" | "language" | null }>>({});

    const setHovered = (repoId: number, language: string | null, type: "bar" | "language" | null) => {
        setHoveredByRepo((prev) => ({ ...prev, [repoId]: { language, type }}))
    };

    const setToggle = (repoId: number, toggle: boolean) => {
        setRepos((prev) => prev.map((repo) => repo.id === repoId ? {...repo, toggle} : repo));
    };

    const skeletons = Array.from({ length: 9 });

    const getColor = async (language: string) => {
        return axios.get('https://raw.githubusercontent.com/ozh/github-colors/master/colors.json').then((response) => {
            const data = response.data;
            const color = data[language].color;
            return color;
        });
    }
    
    const invertColor = (language: string) => {
        if (!languageColors[language]) return '#000000';
        const hex = languageColors[language];
        const clean = hex.replace('#', '')
        const full = clean.length === 3
          ? clean.split('').map((c) => c + c).join('')
          : clean
        const r = 255 - parseInt(full.slice(0, 2), 16)
        const g = 255 - parseInt(full.slice(2, 4), 16)
        const b = 255 - parseInt(full.slice(4, 6), 16)
        const toHex = (n: number) => n.toString(16).padStart(2, '0')
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`
    }
    invertColor('JavaScript');

    React.useEffect(() => {
        setError(false);
        setLoading(true);
        setRepos([]);
        const colors: Array<Promise<string>> = [];
        const colorMap: LanguageColors = {};

        const run = async () => {
            let reposResponse: AxiosResponse<Array<Repo>>;
            try {
                reposResponse = await axios.get<Repo[]>('https://api.github.com/users/Shmacked/repos')
            } catch {
                setError(true);
                setLoading(false);
                return;
            }
            
            if (reposResponse.status !== 200) return setError(true);

            const baseRepos = reposResponse.data.map((r: Repo) => ({...r, languages: null as Repo["languages"], toggle: false}));
            const reposWithLanguages = await Promise.all(
                baseRepos.map(async (repo) => {
                    try {
                        const langRes = await axios.get<Record<string, number>>(`https://api.github.com/repos/Shmacked/${repo.name}/languages`)
                        const entries = Object.entries(langRes.data);

                        if (entries.length === 0) return {...repo, languages: []}

                        const total = entries.reduce((acc, [, bytes]) => acc + bytes, 0);

                        entries.forEach(([language]) => {
                            if (colorMap[language]) return;
                            colors.push(getColor(language).then((color) => {
                                colorMap[language] = color;
                                return color;
                            }));
                        });

                        return {...repo, languages: entries.map(([language, bytes]) => ({language, percentage: (bytes / total) * 100}))}
                    } catch {
                        return {...repo, languages: []}
                    }
                })
            );
            setRepos(reposWithLanguages);
            setLoading(false);
            Promise.all(colors).then(() => {
                setLanguageColors(colorMap);
                console.log(colorMap);
            });
        };
        run();
    }, [])

    return (
        <>
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
                        const hoveredLanguage = hoveredByRepo[repo.id];
                        return (
                            <div key={repo.id} className="flex min-h-60 flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
                                <h2 className="mb-2 text-xl font-semibold">
                                    {repo.name}
                                </h2>
                                <div className="relative mb-4 min-h-[5rem] w-full">
                                    <p
                                        className={`absolute inset-x-0 top-0 text-left text-sm text-zinc-600 transition-opacity duration-300 dark:text-zinc-300 ${
                                        repo.toggle ? 'pointer-events-none opacity-0' : 'opacity-100'
                                        }`}
                                    >
                                        {repo.description || 'No description'}
                                    </p>
                                    <div
                                        className={`absolute inset-x-0 top-0 flex flex-row flex-wrap gap-2 transition-opacity duration-300 ${
                                        repo.toggle ? 'opacity-100' : 'pointer-events-none opacity-0'
                                        }`}
                                    >
                                        {repo.languages && [...repo.languages].sort((a, b) => b.percentage - a.percentage).map((language) => (
                                            <span key={language.language} className={`flex flex-row items-center gap-2 ${hoveredLanguage?.language === language.language && hoveredLanguage?.type === "bar" ? 'bg-zinc-200 dark:bg-zinc-700' : ''}`}
                                                onMouseEnter={() => setHovered(repo.id, language.language, "language")}
                                                onMouseLeave={() => setHovered(repo.id, null, null)}>
                                                <span className="border rounded-full w-2 h-2 select-none" style={{backgroundColor: languageColors[language.language]}}></span>
                                                <span className="text-xs text-black dark:text-white select-none">{language.language}</span>
                                                <span className="text-xs text-black dark:text-white select-none">{Math.round(language.percentage)}%</span>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 mt-auto">
                                    <div className="flex h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700 border border-black dark:border-white">
                                    {repo.languages && [...repo.languages].sort((a, b) => b.percentage - a.percentage).map((language) => (
                                        <div
                                            key={language.language}
                                            className={`h-full shrink-0`}
                                            onMouseEnter={() => setHovered(repo.id, language.language, "bar")}
                                            onMouseLeave={() => setHovered(repo.id, null, null)}
                                            title={`${language.language} · ${Math.round(language.percentage)}%`}
                                            style={{
                                                width: `${language.percentage}%`,
                                                backgroundColor: languageColors[language.language],
                                                opacity: `${hoveredLanguage?.language === language.language && hoveredLanguage?.type === null ? '1' : hoveredLanguage?.language !== language.language && hoveredLanguage?.type === "language"? '0' : '1'}`,
                                            }}
                                        />
                                    ))}
                                    </div>
                                </div>
                                <div className="mt-auto inline-flex w-fit ">
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                                    className="items-center rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white transition dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-green-500 transition-colors duration-300 hover:delay-700 hover:text-white hover:bg-green-500 dark:hover:bg-green-900">
                                        View on GitHub
                                    </a>
                                    {repo.toggle ? (
                                        <span className="items-center px-3 py-2 text-sm font-medium transition-colors hover:text-green-500 dark:hover:text-green-900" onClick={() => setToggle(repo.id, false)}>
                                            View Description
                                        </span>
                                    ) : (
                                        <span className="items-center px-3 py-2 text-sm font-medium transition-colors hover:text-green-500 dark:hover:text-green-900" onClick={() => setToggle(repo.id, true)}>
                                            View Languages
                                        </span>
                                    )}
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