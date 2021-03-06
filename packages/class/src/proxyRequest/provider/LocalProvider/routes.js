import db from './libs/db';
import itemsRequest from './libs/itemsRequest';
import routeMethods from './libs/routeMethods';

function getNetworkId(id) {
  return id.split('/')[0];
}

const routes = {
  'account/:addressId/info': {
    table: db.accountsInfo,
    id: 'addressId',
  },
  'account/:addressId': {
    table: db.accounts,
    id: 'addressId',
  },
  'networks/:networkPath(.*)': {
    table: db.networks,
    id: 'networkPath',
  },
  'tokens/:networkId': {
    // only read
    table: db.tokens,
    read(route, args) {
      return route.table
        .filter(item => getNetworkId(item.id) === args.networkId)
        .toArray(list => itemsRequest.getItemData(list));
    },
  },
  'tokens/:networkId/:addressId': {
    table: db.tokens,
    id: args => `${args.networkId}/${args.addressId}`,
  },
  accounts: {
    table: db.accounts,
    async read(route) {
      const list = await itemsRequest.itemsRead(route.table);
      const ret = list.map(item => item.address);
      return ret;
    },
  },
  settings: {
    table: db.settings,
    id: () => 'userSettings',
    async init(route) {
      const initialData = {
        email: 'default@email.com',
        otpEnabled: false,
      };

      let data;
      try {
        data = await routeMethods.read(route);
      } catch (e) {
        data = {};
      }
      const payload = { ...initialData, ...data };
      if (!payload.email) {
        payload.email = initialData.email;
      }

      return routeMethods.add(route, {}, { payload });
    },
    async read(route, args) {
      const [tokens, networks, settings] = await Promise.all([
        db.tokens.toArray(list =>
          // create list of tokens in network id map. { netId:[token1, token2, ], }
          list.reduce((map, item) => {
            const netId = getNetworkId(item.id);
            /* eslint-disable-next-line */
            const tokenList = (map[netId] = map[netId] || []);
            tokenList.push(item.data);
            return map;
          }, {}),
        ),
        db.networks.toArray(list => itemsRequest.getItemData(list)),
        routeMethods.read(route, args),
      ]);

      return {
        tokens,
        networks,
        ...settings,
      };
    },
  },
  'settings/otp': {
    table: db.settings,
    id: () => 'otp',
  },
};

export default routes;
