import React from 'react'
import SongItem from '../../../components/SongItem'

const FavouriteSong = () => {
  return (
    <div>
       {
         [...new Array(4)].map((_, index) => <SongItem key={index} />)
       }
    </div>
  )
}

export default FavouriteSong