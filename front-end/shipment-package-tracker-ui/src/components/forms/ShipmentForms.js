import React from "react";

class Address extends React.Component {
  render() {
    return(
      <div>
        <p>Street:</p>
        <input name="street" className="mb2" value={this.props.address.street} onChange={e => this.props.onChange(e)}
          type="text" placeholder="Street"/>
        <p>Street number:</p>
        <input name="number" className="mb2" value={this.props.address.number} onChange={e => this.props.onChange(e)}
          type="number" placeholder="Street number"/>
        <p>Zip code:</p>
        <input name="zip_code" className="mb2" value={this.props.address.zip_code} onChange={e => this.props.onChange(e)}
          type="text" placeholder="Zip code"/>
        <p>State:</p>
        <input name="state" className="mb2" value={this.props.address.state} onChange={e => this.props.onChange(e)}
          type="text" placeholder="State"/>
        <p>City:</p>
        <input name="city" className="mb2" value={this.props.address.city} onChange={e => this.props.onChange(e)}
          type="text" placeholder="City"/>
        <p>Country:</p>
        <input name="country" className="mb2" value={this.props.address.country} onChange={e => this.props.onChange(e)}
          type="text" placeholder="Country"/>
      </div>)
  }
}

class Customer extends React.Component {
  render() {
    return(
        <div>
          <p>First name:</p>
          <input name="first_name" className="mb2" value={this.props.customer.first_name} onChange={e => this.props.onChange(e)}
          type="text" placeholder="First name"/>
          <p>Last name:</p>
          <input name="last_name" className="mb2" value={this.props.customer.last_name} onChange={e => this.props.onChange(e)}
          type="text" placeholder="Last name"/>
           <p>Email:</p>
          <input name="email" className="mb2" value={this.props.customer.email} onChange={e => this.props.onChange(e)}
          type="email" placeholder="email"/>
           <p>Phone number:</p>
          <input name="phone_number" className="mb2" value={this.props.customer.phone_number} onChange={e => this.props.onChange(e)}
          type="text" placeholder="Phone number"/>
        </div>
    )
  }
}

class Package extends React.Component {
    render() {
        return(
            <div>
          <p>Kg weight:</p>
          <input name="kg_weight" className="mb2" value={this.props.package.kg_weight} onChange={e => this.props.onChange(e)}
          type="number" placeholder="Kg weight"/>
          <p>Packing type:</p>
          <input name="packing_type" className="mb2" value={this.props.package.packing_type} onChange={e => this.props.onChange(e)}
          type="text" placeholder="Packing_type"/>
        </div>)
    }
}

export {
    Address,
    Customer,
    Package
}