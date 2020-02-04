import {Address, Customer, Package} from "./ShipmentForms";
import React from "react";

class ShipToInfo extends React.Component {
    render() {
        if (this.props.currentStep !== 1){
            return null
        }
        return (
            <div>
                <Address address={this.props.address} onChange={this.props.onChangeShipTo.bind(this)}/>
                <Customer customer={this.props.send_to} onChange={this.props.onChangeSendTo.bind(this)}/>
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
                <Customer customer={this.props.send_from} onChange={this.props.onChangeSendFrom.bind(this)}/>
            </div>
        )
    }
}

class PackageInfo extends React.Component {
    render() {
        if (this.props.currentStep !== 3){
            return null
        }
        return(
            <div>
                <Package package={this.props.package_info} onChange={this.props.onChangePackageInfo.bind(this)}/>
            </div>
        )
    }
}

export {
    ShipToInfo,
    ShipFromInfo,
    PackageInfo
}