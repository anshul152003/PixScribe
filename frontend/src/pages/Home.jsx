import React from 'react'
import Headers from '../components/Header'
import Steps from '../components/Steps'
import Description from '../components/Description'
import Testimonals from '../components/Testimonals'
import GenerateBtn from '../components/GenerateBtn'

const Home = () => {
  return (
    <div>
      <Headers />
      <Steps/>
      <Description/>
      <Testimonals/>
      <GenerateBtn/>
    </div>
  )
}

export default Home