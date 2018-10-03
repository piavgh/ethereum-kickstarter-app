import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(campaignFactory.interface),
    '0x60F1b8cf318B18bC5A1215d25E246d29bC34C780'
);

export default instance;
