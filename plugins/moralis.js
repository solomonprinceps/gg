import Moralis from 'moralis';
const serverUrl = process.env.serverUrl;
const appId = process.env.appId;
//   this.$moralis.start({ serverUrl, appId });
Moralis.start({ serverUrl, appId });
export default ({ app }, inject) => {
    inject('moralis', Moralis)
}
