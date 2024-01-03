#!/usr/bin/env node
let [, , exp, arg, ...cmd] = process.argv
let match = new Function('env', `with (env) return (${exp || 0})`)(
  new Proxy(process.env, {
    has: () => true,
    get: (target, key) => (key in target ? target[key] : globalThis[key]),
  })
)
if (arg === '--') {
  if (match && cmd.length) {
    require('child_process').execSync(cmd.join(' '), {stdio: 'inherit'})
  }
} else {
  process.exit(+!match)
}
