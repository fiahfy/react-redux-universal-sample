export default async function (ctx) {
  ctx.body = { node_version: process.version }
}
