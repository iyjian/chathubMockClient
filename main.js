const GRPCClient = require('./libs/GRPCClient')
const conf = require('./conf')
const MockClientAdapter = require('./libs/MockClientAdapter')

const mockClientAdapter1 = new MockClientAdapter('mock001', conf.clientType)
const mockClientAdapter2 = new MockClientAdapter('mock002', conf.clientType)

grpcClient = new GRPCClient({
  mock001: {
    adapter: mockClientAdapter1,
    clientType: conf.clientType,
    clientId: 'mock001'
  },
  mock002: {
    adapter: mockClientAdapter2,
    clientType: conf.clientType,
    clientId: 'mock002'
  }
})

grpcClient.start()