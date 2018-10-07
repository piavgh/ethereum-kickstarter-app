import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';

import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';

class RequestNew extends Component {
    state = {
        value: '',
        description: '',
        recipient: '',
        loading: false,
        errorMessage: ''
    };

    static async getInitialProps(props) {
        const { address } = props.query;

        return { address };
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = async event => {
        const campaign = Campaign(this.props.address);

        const { description, value, recipient } = this.state;

        this.setState({
            loading: true,
            errorMessage: ''
        });

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods
                .createRequest(
                    description,
                    web3.utils.toWei(value, 'ether'),
                    recipient
                )
                .send({
                    from: accounts[0]
                });

            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        } catch (err) {
            this.setState({
                errorMessage: err.message
            });
        }

        this.setState({
            loading: false
        });
    };

    render() {
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>Back</a>
                </Link>
                <h3>Create A Request</h3>
                <Form
                    onSubmit={this.handleSubmit}
                    error={!!this.state.errorMessage}
                >
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            name="description"
                            value={this.props.description}
                            onChange={this.handleInputChange}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input
                            name="value"
                            value={this.props.value}
                            onChange={this.handleInputChange}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            name="recipient"
                            value={this.props.recipient}
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
                        Create!
                    </Button>
                </Form>
            </Layout>
        );
    }
}

export default RequestNew;
