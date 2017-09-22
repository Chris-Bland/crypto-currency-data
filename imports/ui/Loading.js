import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const Loading = ({ children }) => (
  <div className='flexes flex-column justify-center align-center loading'>
     <img className="btcGif" src="./btc.gif" alt="Bitcoin"  />
  </div>
)

export default Loading
