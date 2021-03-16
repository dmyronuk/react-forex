import React, { FunctionComponent } from 'react'
import Header from './Header'
import Main from './Main'

const App: FunctionComponent = () => (
  <div className='flex flex-col h-screen'>
    <Header />
    <Main />
  </div>
)

export default App
