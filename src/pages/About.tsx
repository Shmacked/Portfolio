import React from 'react'

const About: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-6xl p-3 mx-auto">
            <div className="prose dark:prose-invert max-w-none text-left">
                <div className="flex flex-col gap-4">
                    <p className="indent-4">
                        I am a Full Stack Developer specializing in bridging the gap between modern cloud infrastructure and 
                        complex hardware integration. Since 2019, I have focused on building end-to-end systems that solve 
                        long-standing technical challenges, most notably developing a programmatic interface for legacy engraving 
                        machinery - a hurdle that had persisted in the industry for over 15 years.
                    </p>

                    <p className="indent-4">
                        By integrating Rust-powered Python modules and AWS-backed microservices, I transitioned manual, error-prone 
                        customization workflows into streamlined, "one-button" operations for store operators. My experience spans the 
                        full development lifecycle, from designing Tkinter desktop interfaces and React front-ends to managing 
                        asynchronous Celery tasks and AWS cloud architecture.
                    </p>

                    <p className="indent-4">
                        Recently, I have pivoted into the agentic AI and machine learning space, gaining deep technical expertise in building sophisticated 
                        autonomous workflows. My current toolkit includes:
                    </p>

                    <ul className="list-disc list-inside mb-4 indent-4">
                        <li>
                            <span className="font-bold">
                                AI & LLM Orchestration:&nbsp;
                            </span>
                            Generative AI, LangChain, LangGraph, OpenAI Agents SDK, CrewAI, RAG pipelines, and PyTorch.
                        </li>
                        <li>
                            <span className="font-bold">
                                Backend & Cloud:&nbsp;
                            </span>
                            Python, FastAPI, Django, Rust, AWS Infrastructure, Docker, and Linux (CentOS).
                        </li>
                        <li>
                            <span className="font-bold">
                                Data & Databases:&nbsp;
                            </span>
                            PostgreSQL, Chroma DB, Redis, and SQLAlchemy.
                        </li>
                        <li>
                            <span className="font-bold">
                                Frontend & UI:&nbsp;
                            </span>
                            React, TypeScript, JavaScript, Bootstrap 5, Tailwind CSS, and jQuery.
                        </li>
                    </ul>

                    <p className="indent-4">
                        I thrive at the intersection of legacy reliability and cutting-edge automation, building tools that don't 
                        just work, but redefine what is possible for the end-user.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About