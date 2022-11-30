# match-env

Use an inline JavaScript expression to test environment variables.

## Install

```bash
npm install match-env --save-dev
# Or
yarn add match-env --dev
```


## Usage

### Detection Mode

```bash
match-env "NODE_ENV=='test' && BUILD_TARGET!='node'" && echo yes || echo no

# build or noop
match-env 'CI==`true`' && yarn build || ':'

# handle `undefined`, same as `(process.env.FOO || globalThis.FOO)==`
match-env 'FOO==1' && yarn build || ':'
```

### Call Mode

```bash
match-env 'FOO==1' -- yarn build
```
