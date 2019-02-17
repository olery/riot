import {expect} from 'chai'
import riot from '../../src/riot+compiler'

describe('Riot compiler api', () => {
  it('riot compiler exports properly its public api', () => {
    expect(riot).to.be.ok
    expect(riot).to.have.all.keys([
      'register',
      'unregister',
      'mount',
      'unmount',
      'install',
      'uninstall',
      'component',
      'version',
      '__',
      // compiler API
      'compile',
      'compileFromString',
      'compileFromUrl'
    ])
  })

  it('compiler can load asynchronously tags via url', async function() {
    const {code} = await riot.compileFromUrl('/tags/simple.riot')

    expect(code).to.match(/scope\.props\.message/)
  })

  it('compiler can load asynchronously script tags', async function() {
    document.write('<script type=\'riot\' data-src=\'/tags/simple.riot\'></script>')
    await riot.compile()

    expect(window['__riot_registry__']['simple']).to.be.ok

    riot.unregister('simple')
  })

  it('compiler can compile string tags', async function() {
    const {code} = await riot.compileFromString('<my-tag></my-tag>')

    expect(code).to.be.ok
  })
})