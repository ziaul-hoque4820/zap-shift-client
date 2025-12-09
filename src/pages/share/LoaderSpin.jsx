import React from 'react'

function LoaderSpin() {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-base-100 select-none">
            {/* Loading Text */}
            <p className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                Loading
                <span className="loading loading-dots loading-md text-primary"></span>
            </p>
        </div>
    )
}

export default LoaderSpin