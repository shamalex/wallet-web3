"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
require("./App.css");
var WeenusTokenABI_json_1 = require("./WeenusTokenABI.json");
var web3_1 = require("web3");
var onboarding_1 = require("@metamask/onboarding");
var units_1 = require("@ethersproject/units");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this_1 = _super !== null && _super.apply(this, arguments) || this;
        _this_1.state = {
            account: '',
            balance: 0,
            tokenBalance: '',
            tokenName: '',
            amount: 0,
            receiver_address: '0x0000000000000000000000000000000000000000',
            status: ''
        };
        _this_1.initialize = function () {
            //connect button
            var onboardButton = document.getElementById('connectButton');
            //We create a new MetaMask onboarding object to use in our app
            var onboarding = new onboarding_1["default"]();
            //This will start the onboarding proccess
            //Eth_Accounts-getAccountsButton
            var auth = function () { return __awaiter(_this_1, void 0, void 0, function () {
                var web3_2, accounts_1, _this_2, getBalance_1, getTokenBalance_1, submitForm_1, error_1;
                var _this_1 = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            //Will Start the MetaMask Extension
                            return [4 /*yield*/, window.ethereum.request({
                                    method: 'eth_requestAccounts'
                                })];
                        case 1:
                            //Will Start the MetaMask Extension
                            _a.sent();
                            onboardButton.innerText = 'Connected';
                            onboardButton.disabled = true;
                            web3_2 = new web3_1["default"](web3_1["default"].givenProvider || 'http://localhost:3000');
                            return [4 /*yield*/, web3_2.eth.getAccounts()];
                        case 2:
                            accounts_1 = _a.sent();
                            _this_2 = this;
                            getBalance_1 = function () {
                                web3_2.eth.getBalance(accounts_1[0], function (err, result) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        var AccountBalance = parseFloat(units_1.formatUnits(result)).toPrecision(5);
                                        _this_2.setState({
                                            balance: AccountBalance + " ETH"
                                        });
                                        onboardButton.className = 'hidden';
                                    }
                                });
                            };
                            getTokenBalance_1 = function () { return __awaiter(_this_1, void 0, void 0, function () {
                                var abi, address, contract, tokenContract, tokenGetName, balanceOfTx, tokenBalance, SubmitButton;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            abi = WeenusTokenABI_json_1["default"] // JSON
                                            ;
                                            address = '0x101848D5C5bBca18E6b4431eEdF6B95E9ADF82FA';
                                            contract = new web3_2.eth.Contract(abi, address);
                                            tokenContract = new web3_2.eth.Contract(abi, address);
                                            return [4 /*yield*/, tokenContract.methods.name().call().then(function (result) {
                                                    return result;
                                                })];
                                        case 1:
                                            tokenGetName = _a.sent();
                                            return [4 /*yield*/, contract.methods.balanceOf(accounts_1[0]).call()];
                                        case 2:
                                            balanceOfTx = _a.sent();
                                            tokenBalance = parseFloat(units_1.formatUnits(balanceOfTx)).toPrecision(6);
                                            //set value
                                            this.setState({
                                                tokenName: tokenGetName,
                                                account: accounts_1[0],
                                                tokenBalance: tokenBalance
                                            });
                                            SubmitButton = document.getElementById('submitDtn');
                                            SubmitButton.onclick = submitForm_1;
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            submitForm_1 = function () {
                                // using the event emitter
                                web3_2.eth.sendTransaction({
                                    from: _this_1.state.account,
                                    to: _this_1.state.receiver_address,
                                    value: _this_1.state.amount
                                })
                                    .on('transactionHash', function (hash) {
                                    var hashWrap = document.getElementById('transactionHash');
                                    hashWrap.innerText = hash;
                                    _this_2.setState({
                                        status: 'pending...'
                                    });
                                })
                                    .on('receipt', function (receipt) {
                                    if (JSON.stringify(receipt.status) === 'true') {
                                        _this_2.setState({
                                            status: 'completed'
                                        });
                                        getBalance_1();
                                        getTokenBalance_1();
                                    }
                                    else {
                                        _this_2.setState({
                                            status: 'Fail'
                                        });
                                    }
                                })
                                    .on('error', console.error); // If a out of gas error, the second parameter is the receipt.
                            };
                            getBalance_1();
                            getTokenBalance_1();
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            console.error(error_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); };
            var onClickInstall = function () {
                onboardButton.innerText = 'Onboarding in progress';
                onboardButton.disabled = true;
                //On this object we have startOnboarding which will start the onboarding process for our end user
                onboarding.startOnboarding();
            };
            //Created check function to see if the MetaMask extension is installed
            var isMetaMaskInstalled = function () {
                //Have to check the ethereum binding on the window object to see if it's installed
                return Boolean(window.ethereum && window.ethereum.isMetaMask);
            };
            var MetamaskClientCheck = function () {
                //Now we check to see if Metmask is installed
                if (!isMetaMaskInstalled()) {
                    //If it isn't installed we ask the user to click to install it
                    onboardButton.innerText = 'Click here to install MetaMask!';
                    //When the button is clicked we call th is function
                    onboardButton.onclick = onClickInstall;
                    //The button is now disabled
                    onboardButton.disabled = false;
                }
                else {
                    //If MetaMask is installed we ask the user to connect to their wallet
                    onboardButton.innerText = 'Connect to metamask';
                    //When the button is clicked we call this function to connect the users MetaMask Wallet
                    onboardButton.onclick = auth;
                    //The button is now disabled
                    onboardButton.disabled = false;
                }
            };
            MetamaskClientCheck();
        };
        return _this_1;
    }
    // After the component did mount, we set the state each second.
    App.prototype.componentDidMount = function () {
        this.initialize();
    };
    App.prototype.handleOnChangeAmount = function (event) {
        this.setState({
            amount: event.target.value
        });
    };
    App.prototype.handleOnChangeReceiver = function (event) {
        this.setState({
            receiver_address: event.target.value
        });
    };
    // render will know everything!
    App.prototype.render = function () {
        var _this_1 = this;
        var accountAuth = this.state.account; //show form transfer when user authorized
        return (react_1["default"].createElement("div", { className: "metaWrap" },
            react_1["default"].createElement("button", { type: "button", className: "btn-default", id: "connectButton" }),
            accountAuth.length > 0 &&
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("p", null,
                        "Your account: ",
                        react_1["default"].createElement("span", null, this.state.account)),
                    react_1["default"].createElement("p", null,
                        "Balance: ",
                        react_1["default"].createElement("span", null, this.state.balance)),
                    react_1["default"].createElement("p", null,
                        this.state.tokenName,
                        " Token Balance: ",
                        react_1["default"].createElement("span", null, this.state.tokenBalance)),
                    react_1["default"].createElement("hr", null),
                    react_1["default"].createElement("h4", null, "Form for transfer"),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", null, "Amount"),
                        react_1["default"].createElement("input", { type: "number", min: "0", value: this.state.amount, onChange: function (e) { return _this_1.handleOnChangeAmount(e); } })),
                    react_1["default"].createElement("br", null),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", null, "Receiver address"),
                        react_1["default"].createElement("input", { type: "text", value: this.state.receiver_address, onChange: function (e) { return _this_1.handleOnChangeReceiver(e); } })),
                    react_1["default"].createElement("br", null),
                    react_1["default"].createElement("button", { type: "button", className: "btn-default", id: "submitDtn" }, "Send")),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("div", { id: "pendingStatus" }, this.state.status),
            react_1["default"].createElement("div", { id: "transactionHash" })));
    };
    return App;
}(react_1["default"].Component));
exports["default"] = App;
