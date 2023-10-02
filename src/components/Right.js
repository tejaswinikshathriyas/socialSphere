import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp , faSortDown } from '@fortawesome/free-solid-svg-icons'


function Right() {
  return (
    <div className='right-cnt'>
      <div className='right-divs'>
        <FontAwesomeIcon icon={faSortUp} />
        <p>sort by new</p>
      </div>
      <div className='right-divs'>
        <FontAwesomeIcon icon={faSortDown} />
        <p>sort by old</p>
      </div>
    </div>
  )
}

export default Right