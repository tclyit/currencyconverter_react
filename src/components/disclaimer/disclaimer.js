import React from 'react';
require('./disclaimer.scss');

/*
* Create `Disclaimer` component
*/
class Disclaimer extends React.Component{
    constructor() {
        super();
    }

    /*
    * Render DOM element
    */
    render() {
        return (
            <div className="disclaimer-rate">
                <h2>Exchange Rate Disclaimer</h2>
                <hr />
                <div className="disclaimer-container">
                    <p>
                        <a href="http://www.fixer.io" target="_blank">Fixer.io</a> is a free JSON API for current and historical foreign exchange rates published by the European Central Bank.
                        The rates are updated daily around 4PM CET.
                    </p>
                    <div>
                        <ol>
                            <li>The API runs on Digital Ocean.</li>
                            <li>The SSL/TLS certificate is provided by Let's Encrypt.</li>
                            <li>Check out the source code on GitHub.</li>
                            <li>Fetch the data sets on ECB.</li>
                            <li>The API comes with no warranty.</li>
                        </ol>
                    </div>
                </div>
                <hr />
                <div className="button-container">
                    <button type="button" onClick={this.props.handleClick}>Ok</button>
                </div>
            </div>
        );
    };
};

/*
* Setup prop types
*/
React.propTypes = {
    handleClick: React.PropTypes.func.isRequired
};

module.exports = Disclaimer;