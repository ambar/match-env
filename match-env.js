#!/usr/bin/env node
process.exit(
  +!new Function('x', `with (x) return (${process.argv[2] || 0})`)(process.env)
)
