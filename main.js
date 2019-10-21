const GRPCClient = require('./libs/GRPCClient')

const MockClientAdapter = require('./libs/MockClientAdapter')

const mockClientAdapter1 = new MockClientAdapter('mock001', 'WECHATMACPRO')
const mockClientAdapter2 = new MockClientAdapter('mock002', 'WECHATMACPRO')

grpcClient = new GRPCClient({
  mock001: {
    adapter: mockClientAdapter1,
    clientType: 'WECHATMACPRO',
    clientId: 'mock001'
  },
  mock002: {
    adapter: mockClientAdapter2,
    clientType: 'WECHATMACPRO',
    clientId: 'mock002'
  }
})

grpcClient.start()