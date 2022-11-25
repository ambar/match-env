# match-env

Use inline (eval) script to test environment variables.

## Install

```bash
npm install match-env --save-dev
# Or
yarn add match-env --dev
```


## Usage

```bash
match-env "NODE_ENV=='test' && BUILD_TARGET!='node'" && echo yes || echo no

# build or noop
match-env 'CI==`true`' && yarn build || ':'

# handle `undefined`, same as `process.env.FOO==`
match-env 'env.FOO==1' && yarn build || ':'
```
