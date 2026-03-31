import React from 'react'
import Home from '../../components/Simple_elite_temp_Components.jsx/Home'


const Simple_elite_temp = ({ heading, guarantee, video, ctas, form }) => {
  return (
    <div>
      <Home
        heading={heading}
        guarantee={guarantee}
        video={video}
        ctas={ctas}
        form={form}
      />
    </div>
  )
}


export default Simple_elite_temp