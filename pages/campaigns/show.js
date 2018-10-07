import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';

import factory from '../../ethereum/factory';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();

        return {
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                description:
                    'The manager created this campaign and can create requests to withdraw money',
                meta: 'Address Of Manager',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                description:
                    'You need to contribute at least this much wei to become a contributor',
                meta: 'Minimum contribution (wei)'
            },
            {
                header: requestsCount,
                description:
                    'A request tries to withdraw money form the contract. Requests must be approved by approvers',
                meta: 'Number of Requests'
            },
            {
                header: approversCount,
                description:
                    'Number of people who have already donated to the campaign',
                meta: 'Number of Approvers'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                description: 'How much money this campaign has',
                meta: 'Campaign Balance (ether)'
            }
        ];

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h3>Campaign Show</h3>
                {this.renderCards()}
            </Layout>
        );
    }
}

export default CampaignShow;
