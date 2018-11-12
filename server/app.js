const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('koa-weapp-demo')
const response = require('./middlewares/response')
const bodyParser = require('./middlewares/bodyparser')
const { ApolloServer, gql } = require('apollo-server-koa');

const config = require('./config')
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typedefs');

// 使用响应处理中间件
app.use(response)

// 解析请求体
app.use(bodyParser())

// 引入路由分发
const router = require('./routes')
app.use(router.routes())

// 集成graphql
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`))
