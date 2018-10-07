import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {
    state = {
        value: '',
        errorMessage: '',
        loading: false
    };

    handleInputChange = event => {
        this.setState({
            value: event.target.value
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({
            errorMessage: '',
            loading: true
        });

        const campaign = Campaign(this.props.address);

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });

            Router.replaceRoute(`/campaigns/${this.props.address}`);
        } catch (err) {
            this.setState({
                errorMessage: err.message
            });
        }

        this.setState({
            value: '',
            loading: false
        });
    };

    render() {
        return (
            <Form
                onSubmit={this.handleSubmit}
                error={!!this.state.errorMessage}
            >
                <Form.Field>
                    <label>Amount To Contribute</label>
                    <Input
                        value={this.state.value}
                        label="ether"
                        labelPosition="right"
                        onChange={this.handleInputChange}
                    />
                </Form.Field>
                <Message
                    error
                    header="Oops!"
                    content={this.state.errorMessage}
                />
                <Button
                    loading={this.state.loading}
                    disabled={this.state.loading}
                    primary
                >
                    Contribute!
                </Button>
            </Form>
        );
    }
}

export default ContributeForm;
