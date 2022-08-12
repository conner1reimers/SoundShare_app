import React from 'react'

interface Props {
    type: string
}

const BrowseHead: React.FC<Props> = ({type}) => {
    return (
        <div className="main-browse--headingSection">
            <header className="main-browse--headingSection--head">
            <h1 className="headings">Browse {type}</h1>
            </header>

            <div className="main-browse--headingSection--box">
            <span></span>
            </div>
      </div>
    )
}

export default BrowseHead
