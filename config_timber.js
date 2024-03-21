/**
@module default.js
@author iAmMichaelConnor
@desc constants used by a nubmer of other modules
*/

let nodeHashLength;
let zero;

if (process.env.HASH_TYPE === 'mimc') {
  nodeHashLength = 32;
  if (process.env.CURVE === 'BLS12_377') {
    zero = 0;
  } else {
    zero = '0x0000000000000000000000000000000000000000000000000000000000000000';
  }
} else {
  nodeHashLength = 27;
  zero = '0x000000000000000000000000000000000000000000000000000000';
}

module.exports = {
  // general:
  ZERO: zero,

  // Tree parameters. You also need to set these in the MerkleTree.sol contract.

  HASH_TYPE: process.env.HASH_TYPE,
  CURVE: process.env.CURVE,
  LEAF_HASHLENGTH: 32, // expected length of leaves' values in bytes
  NODE_HASHLENGTH: nodeHashLength, // expected length of nodes' values up the merkle tree, in bytes
  TREE_HEIGHT: 32, // the height of the Merkle tree

  POLLING_FREQUENCY: 6000, // milliseconds
  FILTER_GENESIS_BLOCK_NUMBER: 0, // blockNumber

  tolerances: {
    LAG_BEHIND_CURRENT_BLOCK: 5, // add warnings for use of tree data which lags further behind the current block (e.g. due to anonymity concerns)
  },

  UPDATE_FREQUENCY: 100, // TODO: recalculate the tree every 'x' leaves - NOT USED YET
  BULK_WRITE_BUFFER_SIZE: 1000, // number of documents to add to a buffer before bulk-writing them to the db

  // contracts to filter:
  contracts: {
    // contract name:
    EscrowShield: {
      treeHeight: 32,
      events: {
        // filter for the following event names:
        NewLeaf: {
          // filter for these event parameters:
          parameters: ['leafIndex', 'leafValue'],
        },
        NewLeaves: {
          // filter for these event parameters:
          parameters: ['minLeafIndex', 'leafValues'],
        },
      },
      address: process.env.ESCROW_SHIELD_ADDRESS,
    },
  },

  /*
  # Where to find the contractInstances?
  # Specify one of:
  # - 'remote' (to GET them from a remote microservice); or
  # - 'mongodb' (to get them from mongodb); or
  # - 'compile' (to compile the contracts from /app/build to /app/build/contracts)
  # - 'default' (to get them from the /app/build/contracts folder)
  */
  contractOrigin: process.env.CONTRACT_ORIGIN,

  contractsPath: '/app/contracts/', // where to find contract .sol files (if applicable)
  buildPath: '/app/build/contracts/', // where to find the contract interface json files

  // external contract deployment microservice (which deploys the MerkleTree.sol contract):
  deployer: {
    host: process.env.DEPLOYER_HOST,
    port: process.env.DEPLOYER_PORT,
  },

  // mongodb:
  mongo: {
    host: 'mongo-merkle-tree',
    port: '27017',
    databaseName: process.env.DB_NAME || 'merkle_tree',
    admin: 'admin',
    adminPassword: 'admin',
    dbUrl: process.env.DB_URL || 'mongodb://mongo-merkle-tree:27017',
  },
  isLoggerEnabled: true,

  // web3:
  web3: {
    host: process.env.BLOCKCHAIN_HOST,
    port: process.env.BLOCKCHAIN_PORT,
    rpcUrl: process.env.RPC_URL,
    options: {
      defaultAccount: '0x0',
      defaultBlock: '0', // e.g. the genesis block our blockchain
      defaultGas: 2000000,
      defaultGasPrice: 20000000000,
      transactionBlockTimeout: 50,
      transactionConfirmationBlocks: 15,
      transactionPollingTimeout: 480,
      // transactionSigner: new CustomTransactionSigner()
    },
  },
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};
