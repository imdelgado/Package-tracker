import React from 'react'
import Shipment from './Shipment'
import { useQuery } from 'urql'
import gql from 'graphql-tag';

const SHIPMENTS_QUERY = gql`
  {
    shipment {
      tracking_number
    }
  }
`

const ShipmentList = () => {
  const [result] = useQuery({ query: SHIPMENTS_QUERY });
  const { data, fetching, error} = result

  console.log(result)

  if (fetching) return <div>Fetching</div>
  if (error) return <div>error</div>

  const shipmentsToRender = data.shipment

  return (
    <div>
      {shipmentsToRender.map(shipment =>
        <Shipment key={shipment.tracking_number} shipment={shipment}/>)}
    </div>
  )
}

export default ShipmentList
