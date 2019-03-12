import {
  define,
  render,
  Component,
  cloneElement,
  WeElement,
  createRef,
  getHost
} from '../../src/omi'

describe('install()', () => {
  let scratch
  //const Empty = () => null

  before(() => {
    scratch = document.createElement('div')
      ; (document.body || document.documentElement).appendChild(scratch)
  })

  beforeEach(() => {
    //let c = scratch.firstElementChild;
    //if (c) render(<Empty />, scratch, { merge: c })
    scratch.innerHTML = ''
  })

  after(() => {
    scratch.parentNode.removeChild(scratch)
    scratch = null
  })

  it('should render components', () => {
    class Ele extends Component {
      render() {
        return <div>Ele</div>
      }
      install() {
        console.log(123)
      }
    }

    define('my-ele', Ele)
    sinon.spy(Ele.prototype, 'render')
    render(<my-ele />, scratch)

    expect(Ele.prototype.render)
      .to.have.been.calledOnce.and.to.have.been.calledWithMatch({}, {})
      .and.to.have.returned(sinon.match({ nodeName: 'div' }))

    expect(scratch.firstChild.shadowRoot.innerHTML).to.equal('<div>Ele</div>')
  })


})
