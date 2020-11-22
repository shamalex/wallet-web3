import React from 'react';
import './App.css';
import jsonToken from './WeenusTokenABI.json';

import Web3 from 'web3';
import MetaMaskOnboarding from '@metamask/onboarding';
import {
    formatUnits
} from "@ethersproject/units";


interface MyWindow extends Window {
    isMetaMask: boolean;
    request: any
}

interface IState {
    account: string;
    balance: number,
    tokenBalance: string,
    tokenName: string,
    amount: number,
    receiver_address: string,
    status: string
}

declare global {
    interface Window {
        ethereum: MyWindow
    }
}

export default class App extends React.Component {

    public state: IState = {
        account: '',
        balance: 0,
        tokenBalance: '',
        tokenName: '',
        amount: 0,
        receiver_address: '0x0000000000000000000000000000000000000000',
        status: ''
    };

    initialize = () => {
        //connect button
        const onboardButton = document.getElementById('connectButton') as HTMLButtonElement;
        //We create a new MetaMask onboarding object to use in our app
        const onboarding = new MetaMaskOnboarding();
        //This will start the onboarding proccess

        //Eth_Accounts-getAccountsButton
        const auth = async () => {
            try {
                //Will Start the MetaMask Extension
                await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });
                onboardButton.innerText = 'Connected';
                onboardButton.disabled = true;
                const web3 = new Web3(Web3.givenProvider || 'http://localhost:3000')
                const accounts = await web3.eth.getAccounts();

                let _this = this;
                const getBalance = () => {
                    web3.eth.getBalance(accounts[0], function (err, result) {
                        if (err) {
                            console.log(err)
                        } else {
                            let AccountBalance = parseFloat(formatUnits(result)).toPrecision(5)
                            _this.setState({
                                balance: AccountBalance + " ETH"
                            })
                            onboardButton.className = 'hidden';
                        }
                    })
                }
                const getTokenBalance = async () => {
                    const abi: any = jsonToken // JSON
                    const address = '0x101848D5C5bBca18E6b4431eEdF6B95E9ADF82FA'; // DAI
                    const contract = new web3.eth.Contract(abi, address);

                    let tokenContract = new web3.eth.Contract(abi, address);
                    let tokenGetName = await tokenContract.methods.name().call().then(function (result: any) {
                        return result;
                    });
                    const balanceOfTx = await contract.methods.balanceOf(accounts[0]).call()
                    let tokenBalance = parseFloat(formatUnits(balanceOfTx)).toPrecision(6)

                    //set value
                    this.setState({
                        tokenName: tokenGetName,
                        account: accounts[0],
                        tokenBalance: tokenBalance
                    })

                    //call transfer function
                    const SubmitButton = document.getElementById('submitDtn') as HTMLButtonElement;
                    SubmitButton.onclick = submitForm;
                }
                const submitForm = () => {

                    // using the event emitter
                    web3.eth.sendTransaction({
                        from: this.state.account,
                        to: this.state.receiver_address,
                        value: this.state.amount
                    })
                    .on('transactionHash', function(hash: any){
                        let hashWrap = document.getElementById('transactionHash') as HTMLInputElement
                        hashWrap.innerText = hash;
                        _this.setState({
                            status: 'pending...'
                        })
                    })
                    .on('receipt', function(receipt: any){
                        if (JSON.stringify(receipt.status) === 'true') {
                            _this.setState({
                                status: 'completed'
                            })
                            getBalance()
                            getTokenBalance()
                        } else {
                            _this.setState({
                                status: 'Fail'
                            })
                        }
                    })
                    .on('error', console.error); // If a out of gas error, the second parameter is the receipt.
                }
                getBalance()
                getTokenBalance()
            } catch (error) {
                console.error(error);
            }

        }

        const onClickInstall = () => {
            onboardButton.innerText = 'Onboarding in progress';
            onboardButton.disabled = true;
            //On this object we have startOnboarding which will start the onboarding process for our end user
            onboarding.startOnboarding();
        }

        //Created check function to see if the MetaMask extension is installed
        const isMetaMaskInstalled = () => {
            //Have to check the ethereum binding on the window object to see if it's installed
            return Boolean(window.ethereum && window.ethereum.isMetaMask);
        };

        const MetamaskClientCheck = () => {
            //Now we check to see if Metmask is installed
            if (!isMetaMaskInstalled()) {
                //If it isn't installed we ask the user to click to install it
                onboardButton.innerText = 'Click here to install MetaMask!';
                //When the button is clicked we call th is function
                onboardButton.onclick = onClickInstall;
                //The button is now disabled
                onboardButton.disabled = false;
            } else {
                //If MetaMask is installed we ask the user to connect to their wallet
                onboardButton.innerText = 'Connect to metamask';
                //When the button is clicked we call this function to connect the users MetaMask Wallet
                onboardButton.onclick = auth;
                //The button is now disabled
                onboardButton.disabled = false;
            }
        };

        MetamaskClientCheck();

    }
    // After the component did mount, we set the state each second.
    componentDidMount() {
        this.initialize()
    }

    public handleOnChangeAmount(event: any): void {
        this.setState({
            amount: event.target.value
        });
    }

    public handleOnChangeReceiver(event: any): void {
        this.setState({
            receiver_address: event.target.value
        });
    }

    // render will know everything!
    render() {
        const accountAuth = this.state.account //show form transfer when user authorized
        return (
            <div className="metaWrap">

                <button type="button" className="btn-default" id="connectButton"></button>

                {accountAuth.length > 0 &&
                    <div>
                        <p>Your account: <span>{this.state.account}</span></p>
                        <p>Balance: <span>{this.state.balance}</span></p>
                        <p>{this.state.tokenName} Token Balance: <span>{this.state.tokenBalance}</span></p>
                        <hr/>
                        <h4>Form for transfer</h4>

                        <div>
                            <label>Amount</label>
                            <input type="number" min="0" value={this.state.amount} onChange={ e => this.handleOnChangeAmount(e) }></input>
                        </div>
                        <br/>

                        <div>
                            <label>Receiver address</label>
                            <input type="text" value={this.state.receiver_address} onChange={ e => this.handleOnChangeReceiver(e) }></input>
                        </div>
                        <br/>

                        <button type="button" className="btn-default" id="submitDtn">
                            Send
                        </button>
                    </div>
                }
                <br/>
                <div id="pendingStatus">{this.state.status}</div>
                <div id="transactionHash"></div>
            </div>
        );
    }
}