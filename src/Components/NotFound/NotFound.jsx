import React, { Component } from 'react'
import notFound from '../../assets/notfounddark.png'
export class NotFound extends Component {
  render() {
    return (
      <div className='min-h-svh'>
        <img src={notFound} alt=""  width={500}/>
      </div>
    )
  }
}

export default NotFound