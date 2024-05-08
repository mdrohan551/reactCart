import React from 'react'
import MasterLayout from '../components/MasterLayout'

const NotFoundPage = () => {
  return (
  <MasterLayout>
      <div>
      <div className="container mx-auto vh-100   d-flex align-items-center justify-content-center ">
        <div className="row">
            <h1 className=' notfound'>404 Not Found</h1>
          </div>
        </div>
      </div>
  </MasterLayout>
  )
}

export default NotFoundPage