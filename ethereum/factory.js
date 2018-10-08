import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(campaignFactory.interface),
    '0x6870992AEA9f29151780CfE99011B19D1b31Ac24'
);

export default instance;
