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
    }
    `

class Address extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      street: '',
      number: 0,
      zip_code: '',
      city: '',
      state: '',
      country: '',
    };
  }

  changeHandler = (event) => {
    let propName = event.target.name;
    let propValue = event.target.value;
    this.setState({[propName]: propValue});
  };

  render() {
    return(
      <div>
        <p>Street:</p>
        <input className="mb2" value={this.state.street} onChange={this.changeHandler}
          type="text" placeholder="Street"/>
        <p>Street number:</p>
        <input className="mb2" value={this.state.number} onChange={this.changeHandler}
          type="number" placeholder="Street number"/>
      </div>)
  }
}

const CreateShipment = props => {
  const [tracking_number, setTrackingNumber] = React.useState('')

  const [state, executeMutation] = useMutation(CREATE_SHIPMENT)

  const submit = React.useCallback(() => {
    executeMutation({
      tracking_number
    })
  }, [executeMutation,tracking_number])

  return (
    <div>
      <div className="flex flex-column mt3">
        <input className="mb2" value={tracking_number} onChange={e => setTrackingNumber(e.target.value)}
        type="text" placeholder="Shipment tracking_number"/>
      </div>
      <div>
        <Address/>
      </div>
      <button disabled={state.fetching} onClick={submit}>
        Submit
      </button>
    </div>
  );

}


export default CreateShipment
