import React from 'react';
import TagCloud, {type TagCloudOptions} from 'TagCloud';

const TextSphere: React.FC = () => {
    const container = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const el = container.current;        
        const texts = (
            "Generative AI, Agentic AI, LangChain, LangGraph, OpenAI Agents SDK, CrewAI, RAG," +
            "Python, FastAPI, Django, Celery, Rust, AWS, Docker, Linux," +
            "PostgreSQL, Chroma DB, Redis, SQLAlchemy," +
            "React, TypeScript, JavaScript, Bootstrap 5, Tailwind CSS, jQuery,"
        ).split(',');
        const options: TagCloudOptions = { radius: 250, maxSpeed: 'fast', initSpeed: 'fast' };

        if (!el) return;

        const instance = TagCloud([el], texts, options);
        return () => { instance.destroy(); };
    }, []);

  return (
    <div className="text-sphere flex select-none w-full justify-center items-center">
      <span ref={container} className="tagcloud"></span>
    </div>
  );
};
export default TextSphere;