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
  changeHandler(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    this.props.onChange(fieldName, fieldValue);
  }

  render() {
    return(
      <div>
        <p>Street:</p>
        <input className="mb2" value={this.props.ship_to.street} onChange={this.changeHandler.bind(this)}
          type="text" placeholder="Street"/>
        <p>Street number:</p>
        <input className="mb2" value={this.props.ship_to.number} onChange={this.changeHandler.bind(this)}
          type="number" placeholder="Street number"/>
      </div>)
  }
}

class CreateShipment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ship_to:{
        street:'',
        number:0,
        zip_code:'',
        city:'',
        state:'',
        country:'',
      }
    }
  }

  onChange(field, value) {
    this.setState({[field]: value});
  }

  render(){
    return(
    <div>
        <Address ship_to={this.state.ship_to} onChange={this.onChange.bind(this)}/>
    </div>)
  }
}

// const CreateShipment = props => {
//   const [tracking_number, setTrackingNumber] = React.useState('')
//
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
