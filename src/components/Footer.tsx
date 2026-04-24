import React from 'react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const Footer: React.FC = () => {
    return (
        <footer className="sticky bottom-0 z-50 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
            <div className="container mx-auto px-4 py-4 flex items-center justify-end px-4 py-4">

                <div className="flex items-center gap-4">
                    <a href="https://github.com/shmacked" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="h-5 w-5 hover:text-zinc-900 dark:hover:text-zinc-100" />
                    </a>
                    <a href="https://www.linkedin.com/in/shane-mcclain/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="h-5 w-5 hover:text-zinc-900 dark:hover:text-zinc-100" />
                    </a>
                    <a href="mailto:hide579c@gmail.com" target="_blank" rel="noopener noreferrer">
                        <FaEnvelope className="h-5 w-5 hover:text-zinc-900 dark:hover:text-zinc-100" />
                    </a>
                </div>
                
            </div>
        </footer>
    )
}

export default Footer;