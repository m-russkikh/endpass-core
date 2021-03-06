import namehash from 'eth-ens-namehash';
import injectWeb3 from '@/injectWeb3';
import ABI from './abi/ens.json';

let web3;

const registryAddresses = {
  // Mainnet
  '1': '0x314159265dd8dbb310642f98f50c066173c1259b',
  // Ropsten
  '3': '0x112234455c3a32fd11230c42e7bccd4a84e02010',
  // Rinkeby
  '4': '0xe7410170f87102DF0055eB195163A03B7F2Bff4A',
  // Ethereum Classic
  '61': '0xb96836a066ef81ea038280c733f833f69c23efde',
};

const addressReg = /^0x[0]{40}$/;

export default class ENSResolver {
  static set web3(val) {
    web3 = val;
  }

  static async getAddress(name) {
    const { Contract, net } = web3.eth;
    const registryContract = new Contract(ABI);
    const netId = await net.getId();
    const node = namehash.hash(name);

    Object.assign(registryContract.options, {
      address: registryAddresses[netId],
    });

    const address = await registryContract.methods.resolver(node).call();

    if (addressReg.test(address)) {
      throw new Error("Name isn't resolvable");
    }

    return address;
  }
}

const createENSClass = injectWeb3(ENSResolver);

export { createENSClass };
