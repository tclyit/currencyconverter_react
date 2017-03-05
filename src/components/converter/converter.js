import React from 'react';
import fetch from 'isomorphic-fetch';
import Disclaimer from '../disclaimer/disclaimer';

require('./converter.scss');

/*
* Create Converter widget
* The widget can be reused in different places.
* To work with exchange rate, the calculation and update element will be based on 
* state and component event changed which this can also work with `flux` or any other library while needed.
*/
class Converter extends React.Component {
    constructor() {
        super();
        this.state = {
            rates: {},
            inputRate: '',
            baseRateName: 'CAD',
            toRateName: 'USD',
            convertedAmount: '',
            invalidNumber: false,
            showDisclaimer: false
        };

        this.handleClickDisclaimer = this.handleClickDisclaimer.bind(this);
        this.handleClickDisclaimerOK = this.handleClickDisclaimerOK.bind(this);
    }

    /*
    * Hanle get exchange rate from REST api
    * Use isomorphic fetch get method to call exchange rate API
    */
    getExchangeRate() {
        let baseUrl = 'http://api.fixer.io/latest';
        let a = this.state.baseRateName;
        let b = this.state.toRateName;

        // some validation which may need to add more depends on rules provided
        if(this.state.inputRate === '' || a === '' || b === '') {
            this.setState({ convertedAmount: '' });   
            return false;
        }
        
        if(a === b) {
            this.setState({ convertedAmount: this.state.inputRate });
            return false;
        }
        
        fetch(`${baseUrl}?base=${a}&symbols=${b}`)
            .then(response => response.json())
            .then(json => json.rates)
            .then(rates => {
                this.setState({rates: rates});
                this.calculateRate();
            }).catch(error => {
                // error which can manipulate in different way
                console.log(`error occurred on ${error}`);
            });
    }

    /**
    * Handle action on rate change when user inputs rate value into box
    * The state will update and get calculated the exchange rate in the call back function.
    * @param {object} event - input onChange event object 
    */
    handleChangeRate (event) {
        let value = event.target.value;
        this.validateNumber(value);
        if(isNaN(inputRate) || inputRate === 0) inputRate = '';
        let inputRate = Number(value);
        
        this.setState({ inputRate: inputRate }, function() {
            this.getExchangeRate();
        });
    }

    /**
    * Handle action on select currency name from dropdown list
    * The state will update and get calculated the exchange rate in the call back function.
    * There are two arguments for this method:
    * - `event` - select onChange event object
    * - `currencytype` - which 0 is for [from currency dropdown list] else [to currency dropdown list]
    */
    handleSelectChange() {
        let event = arguments[1];
        let type = arguments[0];
        let currencyType = {};
        let rateName = event.target.value;
        currencyType = (type === 0) ? {baseRateName: rateName} : { toRateName: rateName };
        this.setState(currencyType, function() {
            this.getExchangeRate();
        });
    }

    /*
    * Handle simple calculation rate value and update convertedAmount state
    * Note: the return value will round up with toFixed method and will need
    * to modify up on rules
    */
    calculateRate() {
        var exchangeRate = this.state.rates[this.state.toRateName];
        // in absolute case this rate value 'd[toName]' 
        // must force to parse to float if not promised by rest api result
        let n = this.state.inputRate * exchangeRate;
        this.setState({ convertedAmount: Number(n.toFixed(2)) });
    }

    /*
    * Handle validate input rate value base on require rules
    * In case there is not meet requirement, the error message will show.
    * @param {string} - string rate amount
    */
    validateNumber(rateValue) {
        const pattern = /^[0-9]+(|\.[0-9]{1,2})?$/;
        this.setState({ invalidNumber: !pattern.test(rateValue) });
        if(rateValue == 0) {
            this.setState({ invalidNumber: true });
        }
    }

    /*
    * Handle click on `Disclaimer` link to show disclaimer popup
    * by update the state value
    */
    handleClickDisclaimer() {
        this.setState({ showDisclaimer: true });
    }

    /*
    * Handle click on `Ok` in disclaimer popup to close the popup
    * This method use for `Disclaimer` component which assigned to its props names `handleClick`
    */
    handleClickDisclaimerOK() {
        this.setState({ showDisclaimer: false });
    }

    /*
    * Handle get default currency symbol list
    * This can be added more or get from database.
    */
    getCurrencySymbols () {
        return ['CAD', 'USD', 'EUR'];
    }

    /*
    * Render the DOM elements
    * This component can break it to different component if design needs to.
    * For example: TextBox component, Dropdown component
    */
    render() {
        return (
            <div className="currency">
                <div className="container">
                    <p>Currency converter</p>
                    <div className="content-row">
                        <div className="item-cell">
                            <p>Type in amount and select currency:</p>
                        </div>
                    </div>
                    <div className="content-row">
                        <div className="item-cell currency-number">
                            <input type="text" className="input-text" placeholder="0.00" onChange = {this.handleChangeRate.bind(this)} />
                            { this.state.invalidNumber ? <div className="errors">
                                <span>
                                    This is required field. 
                                </span>
                                <span>
                                    Number must greater than zero / format 1 or 1.23.
                                </span>
                            </div> : null }
                        </div>
                        <div className="item-cell">
                            <select className="select-item" value={this.state.baseRateName} onChange={this.handleSelectChange.bind(this, 0)}>
                                {this.props.currencySymbols.map(function(symbol, i) {
                                    return <option key={i} value={symbol}>{symbol}</option>
                                }, this)}
                            </select>
                        </div>
                    </div>
                    <div className="content-row">
                        <div className="item-cell">
                            <p>Converted amount:</p>
                        </div>
                    </div>
                    <div className="content-row">
                        <div className="item-cell">
                            <input type="text" className="input-text" placeholder="0.00" value={this.state.convertedAmount} readOnly />
                        </div>
                        <div className="item-cell">
                            <select className="select-item" value={this.state.toRateName} onChange={this.handleSelectChange.bind(this, 1)}>
                                {this.props.currencySymbols.map(function(symbol, i) {
                                    return <option key={i} value={symbol}>{symbol}</option>
                                }, this)}
                            </select>
                        </div>
                    </div>
                    <div className="content-row">
                        <div className="item-cell"><p></p></div>
                        <div className="item-cell link">
                            <a className="link disclaimer" onClick={this.handleClickDisclaimer}>Disclaimer</a>
                        </div>
                    </div>
                </div>
                {this.state.showDisclaimer ? <Disclaimer handleClick={this.handleClickDisclaimerOK} /> : null }
            </div>
        );
    };
};

/*
* Setup prop types
*/
Converter.propTypes = {
    currencySymbols: React.PropTypes.arrayOf(React.PropTypes.string)
};

let c = new Converter();
/*
* Setup default prop value
*/
Converter.defaultProps = {
    currencySymbols: c.getCurrencySymbols()
};

export default Converter;