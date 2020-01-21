import {Address, Customer} from "./ShipmentForms";
import React from "react";

class ShipToInfo extends React.Component {
    render() {
        if (this.props.currentStep !== 1){
            return null
        }
        return (
            <div>
                <div>
                    <Address address={this.props.address} onChange={this.props.onChangeShipTo.bind(this)}/>
                </div>
                <div>
                    <Customer customer={this.props.send_to} onChange={this.props.onChangeSendTo.bind(this)}/>
                </div>
            </div>
        )
    }
}

class ShipFromInfo extends React.Component {
    render() {
        if (this.props.currentStep !== 2){
            return null
        }
        return (
            <div>
                <div>
                    <Customer customer={this.props.send_from} onChange={this.props.onChangeSendFrom.bind(this)}/>
                </div>
            </div>
        )
    }
}

export {
    ShipToInfo,
    ShipFromInfo
}