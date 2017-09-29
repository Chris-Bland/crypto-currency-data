import React from 'react'


const Loading = ({ children }) => (
  <div className='flexes flex-column justify-center align-center loading' style={{backgroundColor: 'white'}}>
     <img className="btcGif" src="./btc.gif" alt="Bitcoin"  />
  </div>
)

export default Loading
