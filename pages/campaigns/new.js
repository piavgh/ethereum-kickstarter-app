import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';

import Layout from '../../components/Layout';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        errorMessage: ''
    };

    handleInputChange = event => {
        this.setState({
            minimumContribution: event.target.value
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        try {
            const accounts = await web3.eth.getAccounts();

            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                });
        } catch (err) {
            this.setState({
                errorMessage: err.message
            });
        }
    };

    render() {
        return (
            <Layout>
                <h3>Create a campaign</h3>

                <Form
                    onSubmit={this.handleSubmit}
                    error={!!this.state.errorMessage}
                >
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input
                            value={this.state.minimumContribution}
                            label="wei"
                            labelPosition="right"
                            onChange={this.handleInputChange}
                        />
                    </Form.Field>

                    <Message
                        error
                        header="Oops!"
                        content={this.state.errorMessage}
                    />

                    <Button primary>Create</Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;