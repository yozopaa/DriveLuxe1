import React from 'react'

const Heading = ({title,subtitle}) => {
    return (
        <>
            <div className="heading">
                <p>{title}</p>
                <h1>{subtitle}</h1>
            </div>
        </>
    )
}

export default Heading
