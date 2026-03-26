import React from 'react'
import TextSphere from '../components/TextSphere'

const Home: React.FunctionComponent<{appState: string}> = ({appState}) => {
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-6xl p-3 mx-auto">
            <TextSphere appState={appState} />
        </div>
    )
}

export default Home