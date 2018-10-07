import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(campaignFactory.interface),
    '0x5C4163C75842b55C5fD0360d12E6df2a56fBc5C5'
);

export default instance;
