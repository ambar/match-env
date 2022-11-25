import assert from 'node:assert'
import {exec} from 'node:child_process'
import {promisify} from 'node:util'

const run = promisify(exec)
const ok = {stdout: '', stderr: ''}

{
  let r = await run(`node match-env ""`).catch((r) => r)
  assert.equal(r.code, 1)
}

{
  let r = await run(`node match-env "0"`).catch((r) => r)
  assert.equal(r.code, 1)
}

{
  let r = await run(`node match-env "1"`).catch((r) => r)
  assert.deepEqual(r, ok)
}

{
  process.env.NODE_ENV = 'foo'
  process.env.BUILD_TARGET = 'web'
  let r = await run(
    `node match-env "NODE_ENV=='foo' && BUILD_TARGET=='web'"`
  ).catch((r) => r)
  assert.deepEqual(r, ok)
}

{
  process.env.NODE_ENV = 'foo'
  process.env.BUILD_TARGET = 'web'
  let r = await run(
    `node match-env "NODE_ENV=='foo' && BUILD_TARGET!='node'"`
  ).catch((r) => r)
  assert.deepEqual(r, ok)
}

{
  let r = await run(`node match-env "env.FOO!=1"`).catch((r) => r)
  assert.deepEqual(r, ok)
}
