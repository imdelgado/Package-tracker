import React from 'react'
import ShipmentCard from './ShipmentCard'
import { useQuery } from 'urql'
import gql from 'graphql-tag';
import Accordion from "react-bootstrap/Accordion";

const SHIPMENTS_QUERY = gql`
  {
    shipment {
      tracking_number
      creation_date
      ship_to{
        street
        number
        zip_code
        city
        state
        country
      }
      to{
        first_name
        last_name
      }
      package{
        kg_weight
        packing_type
      }
    }
  }
`;

const ShipmentAccordion = () => {
  const [result] = useQuery({ query: SHIPMENTS_QUERY });
  const { data, fetching, error} = result;

  if (fetching) return <div>Fetching</div>;
  if (error) return <div>error</div>;

  const shipmentsToRender = data.shipment;

  return (
    <Accordion>
        {shipmentsToRender.map(shipment => <ShipmentCard key={shipment.tracking_number} shipment={shipment}/>)}
    </Accordion>
  )
};

export default ShipmentAccordion
