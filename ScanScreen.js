import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState:'normal'
        }
    }

    getCameraPermissions = async ()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermissions: status === 'granted'});
    }

    handleBarcodeScaned = async ({type, data}) =>{
        this.setState({
            scanned: true, 
            scannedData: data,
            buttonState: 'normal'
        })
    }

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if(buttonState === 'clicked' && hasCameraPermissions) {
            return(
                <BarcodeScanner 
                    onBarcodeScanned = {scanned ? undefined : this.handleBarcodeScanned}
                    style = {StyleSheet.absoluteFillObject}
                />
            )
        }

        else if (buttonState === 'normal') {
            return (
                <View style = {styles.container}>
                    <Text style = {styles.displayText}>{hasCameraPermissions === true ? this.state.scannedData : 'Request Camera Permission'}</Text>
                    <TouchableOpacity style = {styles.scanButton}>
                        <Text style = {styles.buttonText}>Scan QR Code</Text>
                        onPress = {this.getCameraPermissions}
                    </TouchableOpacity>
                </View>
            )
        }
    }
}

        const styles = StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            },
            displayText: {
                fontSize: 15, 
                textDecorationLine: 'underline'
            },
            scanButton: {
                backgroundColor: 'blue',
                padding: 10,
                margin: 10
            },
            buttonText: {
                fontSize: 20
            }
        })
