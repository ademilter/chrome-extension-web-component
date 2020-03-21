const template = document.createElement('template')

template.innerHTML = `
  <style>
  .red {
		color: red;
	}
  </style>
  
  <div class="red">
    <p>Hey</p>
    <button type="button">click</button>
  </div>
`

class myComponent extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback () {
    this.shadowRoot.querySelector('button')
      .addEventListener('click', () => console.log('click'))
  }

  disconnectedCallback () {
    this.shadowRoot.querySelector('button')
      .removeEventListener()
  }
}

customElements.define('my-component', myComponent)
