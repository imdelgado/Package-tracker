import React from 'react'
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

const ShipmentCard = ({ shipment }) => {

    const ship_to = shipment.ship_to[0];
    const to = shipment.to[0];
    const package_info = shipment.package[0];

    return(
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Card.Header} eventKey={shipment.tracking_number}>
                    Tracking N° {shipment.tracking_number}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={shipment.tracking_number}>
                    <Card.Body>
                        <div>
                          <h5>Shipment info:</h5>
                          <div>
                            <h6>Ship to:</h6>
                            <p className="p-name">{to.first_name} {to.last_name}</p>
                            <p className="p-address">{ship_to.street} {ship_to.number} #{ship_to.zip_code}, {ship_to.city},
                                {ship_to.state} , {ship_to.country} </p>
                          </div>
                          <div className="div-package">
                              <h5> Package info:</h5>
                              <div className="div-package">
                                  <p>{package_info.packing_type} weight: {package_info.kg_weight}</p>
                              </div>
                          </div>
                        </div>  
                    </Card.Body>
                </Accordion.Collapse>
            </Card.Header>
        </Card>
    )
};

export default ShipmentCard
