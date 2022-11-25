#!/usr/bin/env node
process.exit(
  +!new Function('env', `with (env) return (${process.argv[2] || 0})`)(
    process.env
  )
)
