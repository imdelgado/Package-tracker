import gql from 'graphql-tag'
import {useMutation} from 'urql'
import React from "react";
import {ShipFromInfo, ShipToInfo} from "./forms/StepForms";

const CREATE_SHIPMENT = gql`
  mutation CreateShipment($ship_to_address: AddressInput!, $send_from: CustomerInput!,
    $send_to: CustomerInput!, $package_info: PackageInput!){
      create_shipment(ship_to_address: $ship_to_address, send_from: $send_from,
        send_to: $send_to, package_info: $package_info){
          shipment{
            tracking_number,ship_to{
              street
            }
          },
          success
        }
    }`;

const CreateShipment = props => {
    const [currentStep, setCurrentStep] = React.useState(1);
    const [ship_to_address, setShipTo] = React.useState({
        street: '',
        number: 0,
        zip_code: '',
        city: '',
        state: '',
        country: '',
    });
    const [send_from, setSendFrom] = React.useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
    });
    const [send_to, setSendTo] = React.useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
    });
    const [package_info, setPackageInfo] = React.useState({
        kg_weight: 0,
        packing_type: '',
    });


  const [state, executeMutation] = useMutation(CREATE_SHIPMENT);

  const updateShipTo = e => {
      setShipTo({...ship_to_address,[e.target.name]:e.target.value});
  };

  const updateSendFrom = e => {
      setSendFrom({...send_from,[e.target.name]:e.target.value});
  };

  const updateSendTo = e => {
      setSendTo({...send_to,[e.target.name]:e.target.value});
  };

  const updatePackageInfo = e => {
      setPackageInfo({...package_info,[e.target.name]:e.target.value})
  };

  function _next(currentStep){
      let nextStep = currentStep;

      nextStep = nextStep >= 2? 3: nextStep + 1;
      setCurrentStep(nextStep)
  }

  function _prev(currentStep){
      let prevStep = currentStep;

      prevStep = prevStep <= 1?1: prevStep -1;
      setCurrentStep(currentStep)
  }

  const previoudButton = () => {
      console.log(currentStep)
      if(currentStep !== 1){
          return (<button className="btn btn-secondary" type="button" onClick={_prev}> Back </button>)
      }
      return null;
  };

  const nextButton = () => {
      console.log(currentStep)
      if(currentStep < 3){
          return (<button className="btn btn-secondary" type="button" onClick={_next}> Next </button>)
      }
      return null;
  };

  const submit = React.useCallback(() => {
    executeMutation({
      ship_to_address,send_from,send_to,package_info
    })
  }, [executeMutation,ship_to_address,send_from,send_to,package_info]);

  return (
      <React.Fragment>
          <h1>Create new shipment</h1>
          <form>
            <ShipToInfo currentStep={currentStep} address={ship_to_address} send_to={send_to}
                        onChangeShipTo={updateShipTo.bind(this)} onChangeSendTo={updateSendTo.bind(this)}/>

            <ShipFromInfo currentStep={currentStep} send_from={send_from} onChangeSendFrom={updateSendFrom.bind(this)}/>

            {previoudButton()}{nextButton()}
          </form>
      </React.Fragment>
    // <div>
    //     <div>
    //         <Address address={ship_to_address} onChange={updateShipTo.bind(this)}/>
    //     </div>
    //     <div>
    //         <Customer customer={send_from} onChange={updateSendFrom.bind(this)}/>
    //     </div>
    //     <div>
    //         <Customer customer={send_to} onChange={updateSendTo.bind(this)}/>
    //     </div>
    //     <div>
    //         <Package package={package_info} onChange={updatePackageInfo.bind(this)}/>
    //     </div>
    //   <button disabled={state.fetching} onClick={submit}>
    //     Submit
    //   </button>
    // </div>
  );
};


export default CreateShipment