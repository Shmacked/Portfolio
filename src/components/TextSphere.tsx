import React from 'react';
import TagCloud, {type TagCloudOptions} from 'TagCloud';

const TextSphere: React.FC<{appState: string}> = ({appState}) => {
    const container = React.useRef<HTMLDivElement>(null);
    const tagCloud = React.useRef<any>(null);

    React.useEffect(() => {
        const el = container.current;        
        const texts = (
            "Generative AI, Agentic AI, LangChain, LangGraph, OpenAI Agents SDK, CrewAI, RAG," +
            "Python, FastAPI, Django, Celery, Rust, AWS, Docker, Linux," +
            "PostgreSQL, Chroma DB, Redis, SQLAlchemy," +
            "React, TypeScript, JavaScript, Bootstrap 5, Tailwind CSS, jQuery,"
        ).split(',');
        const options: TagCloudOptions = { radius: 250, maxSpeed: 'fast', initSpeed: 'fast', };

        if (!el) return;

        if (tagCloud.current === null) tagCloud.current = TagCloud([el], texts, options);
        
        if (appState === 'loaded') tagCloud.current.resume();
        else tagCloud.current.pause();
    }, [appState]);

  return (
    <div className="text-sphere flex select-none w-full justify-center items-center">
      <span ref={container} className="tagcloud"></span>
    </div>
  );
};
export default TextSphere;