import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from 'urql'

const CREATE_SHIPMENT = gql`
  mutation CreateShipment($tracking_number: String!, $ship_to_address: AdrressInput!, $send_from: CustomerInput!,
    $send_to: CustomerImput!, $package_info: PackageInput!){
      create_shipment(tracking_number: $tracking_number, ship_to_address: $ship_to_address, send_from: $send_from,
        send_to: $send_to, package_info: $package_info){
          shipment{
            tracking_number,ship_to{
              street
            }
          },
          success
        }
    }`

class Address extends React.Component {
  render() {
    return(
      <div>
        <p>Street:</p>
        <input name="street" className="mb2" value={this.props.ship_to.street} onChange={e => this.props.handleShipTo(e)}
          type="text" placeholder="Street"/>
        <p>Street number:</p>
        <input name="number" className="mb2" value={this.props.ship_to.number} onChange={e => this.props.handleShipTo(e)}
          type="number" placeholder="Street number"/>
        <p>Zip code:</p>
        <input name="zip_code" className="mb2" value={this.props.ship_to.zip_code} onChange={e => this.props.handleShipTo(e)}
          type="text" placeholder="Zip code"/>
        <p>city:</p>
        <input name="city" className="mb2" value={this.props.ship_to.city} onChange={e => this.props.handleShipTo(e)}
          type="text" placeholder="City"/>
      </div>)
  }
}

class CreateShipment extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tracking_number: '',
      ship_to: {
        street: '',
        number: 0,
        zip_code: '',
        city: '',
        state: '',
        country: '',
      }
    }
  };

  onChange(e){
    const key = e.target.name;
    const value = e.target.value;

    this.setState({[key]: value})
  }

  handleShipTo(e){
    const key = e.target.name;
    const value = e.target.value;

    console.log('hehe')

    this.setState({ship_to:{[key]:value}});
  }

  render() {
    return(
        <div>
          <input name="tracking_number" className="mb-2" value={this.state.tracking_number} onChange={e => this.onChange(e)} type="text"
                 placeholder="Shipment tracking number"/>
          <div>
            <Address ship_to={this.state.ship_to} handleShipTo={this.handleShipTo.bind(this)}/>
          </div>
        </div>
    )
  }

}

// const CreateShipment = props => {
//   const [tracking_number, setTrackingNumber] = React.useState('')
//   const [state, executeMutation] = useMutation(CREATE_SHIPMENT)
//
//   const submit = React.useCallback(() => {
//     executeMutation({
//       tracking_number
//     })
//   }, [executeMutation,tracking_number])
//
//   return (
//     <div>
//       <div className="flex flex-column mt3">
//         <input className="mb2" value={tracking_number} onChange={e => setTrackingNumber(e.target.value)}
//         type="text" placeholder="Shipment tracking_number"/>
//       </div>
//       <div>
//         <Address/>
//       </div>
//       <button disabled={state.fetching} onClick={submit}>
//         Submit
//       </button>
//     </div>
//   );
//
// }

export default CreateShipment
