import React from "react";
import {Col, Form, InputGroup} from "react-bootstrap";

class Address extends React.Component {
  render() {
    return(
      <Form.Row>
        <Form.Group as={Col} md="4" controlId="street">
            <Form.Label>Street</Form.Label>
            <Form.Control required name="street" type="text" value={this.props.address.street} placeHolder="Street"
            onChange={e => this.props.onChange(e)}/>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="number">
            <Form.Label>Street Number</Form.Label>
            <Form.Control required name="number" type="number" value={this.props.address.number} placeHolder="Street Number"
            onChange={e => this.props.onChange(e)}
            />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="<zip_code">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control required name="zip_code" type="text" value={this.props.address.zip_code} placeHolder="Zip Code"
            onChange={e => this.props.onChange(e)}
            />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="<state">
            <Form.Label>State</Form.Label>
            <Form.Control required name="state" type="text" value={this.props.address.state} placeHolder="State"
            onChange={e => this.props.onChange(e)}
            />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control required name="city" type="text" value={this.props.address.city} placeHolder="City"
            onChange={e => this.props.onChange(e)}/>
        </Form.Group>
          <Form.Group as={Col} md="4" controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control required name="country" type="text" value={this.props.address.country} placeHolder="Country"
              onChange={e => this.props.onChange(e)}/>
          </Form.Group>
      </Form.Row>)
  }
}

class Customer extends React.Component {
  render() {
    return(
        <Form.Row>
            <Form.Group as={Col} md="4" controlId="first_name">
                <Form.Label>First Name</Form.Label>
                <Form.Control required name="first_name" type="text" value={this.props.customer.first_name}
                              placeHolder="First Name" onChange={e => this.props.onChange(e)}/>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="last_name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control required name="last_name" type="text" value={this.props.customer.last_name}
                              placeHolder="Last Name" onChange={e => this.props.onChange(e)}/>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control required name="email" type="email" value={this.props.customer.email}
                              placeHolder="Email" onChange={e => this.props.onChange(e)}/>
            </Form.Group>
            <Form.Group as={Col} md="4" comntrolId="phone_number">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control required name="phone_number" type="text" value={this.props.customer.phone}
                              placeHolder="Phone Number" onChange={e => this.props.onChange(e)}/>
            </Form.Group>
        </Form.Row>
    )
  }
}

class Package extends React.Component {
    render() {
        return(
        <Form.Row>
            <Form.Group as={Col} md="3" controlId="kg_weight">
                <Form.Label>Weight</Form.Label>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="kgPrepend">KG</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control required name="kg_weight" type="number" value={this.props.package.kg_weight}
                              aria-describedby="kgPrepend"
                              placeHolder="Weight" onChange={e => this.props.onChange(e)}/>
               </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="packing_type">
                <Form.Label>Packing type</Form.Label>
                <Form.Control required name="packing_type" type="text" value={this.props.package.packing_type}
                              placeHolder="Packing type" onChange={e => this.props.onChange(e)}/>
            </Form.Group>
        </Form.Row>)
    }
}

export {
    Address,
    Customer,
    Package
}
