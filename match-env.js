#!/usr/bin/env node
process.exit(
  +!new Function('env', `with (env) return (${process.argv[2] || 0})`)(
    new Proxy(process.env, {
      has: () => true,
      get: (target, key) => (key in target ? target[key] : globalThis[key]),
    })
  )
)
