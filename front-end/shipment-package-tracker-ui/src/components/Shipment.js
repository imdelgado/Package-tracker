import React from 'react'

const Shipment = ({ shipment }) => (
  <div>
    <div>
      {shipment.tracking_number} Createn on: {shipment.creation_date}
    </div>
  </div>
)

export default Shipment
