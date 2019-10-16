const GRPCClient = require('./libs/GRPCClient')
const MockClientAdapter = require('./libs/MockClientAdapter')

const mockClientAdapter = new MockClientAdapter()

grpcClient = new GRPCClient(mockClientAdapter)

grpcClient.start()