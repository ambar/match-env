import assert from 'node:assert/strict'
import {exec} from 'node:child_process'
import {promisify} from 'node:util'

const run = promisify(exec)
const ok = {stdout: '', stderr: ''}

{
  // empty input
  let r = await run(`node match-env ""`).catch((r) => r)
  assert.equal(r.code, 1)
}

{
  // falsy input
  let r = await run(`node match-env "0"`).catch((r) => r)
  assert.equal(r.code, 1)
}

{
  // truthy input
  let r = await run(`node match-env "1"`).catch((r) => r)
  assert.deepEqual(r, ok)
}

{
  // ternary input
  process.env.NODE_ENV = 'foo'
  process.env.BUILD_TARGET = 'web'
  assert.deepEqual(
    await run(`node match-env "NODE_ENV=='foo' && BUILD_TARGET=='web'"`).catch(
      (r) => r
    ),
    ok
  )

  process.env.NODE_ENV = 'foo'
  process.env.BUILD_TARGET = 'web'
  assert.deepEqual(
    await run(`node match-env "NODE_ENV=='foo' && BUILD_TARGET!='node'"`).catch(
      (r) => r
    ),
    ok
  )
}

{
  // undefined input
  let r = await run(`node match-env "FOO!=1"`).catch((r) => r)
  assert.deepEqual(r, ok)
}

{
  // globalThis input
  let r = await run(
    "node match-env 'typeof process.env.PWD === `string` && typeof atob === `function`'"
  ).catch((r) => r)
  assert.deepEqual(r, ok)
}

{
  // call mode
  assert.deepEqual(
    await run("node match-env '1==1' -- echo ok").catch((r) => r),
    {stderr: '', stdout: 'ok\n'}
  )
  assert.deepEqual(
    await run("node match-env '1==0' -- true").catch((r) => r),
    ok
  )
  assert.deepEqual(await run("node match-env '1==0' --").catch((r) => r), ok)
}
