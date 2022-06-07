import TypeWriter from './TypeWriter.js';
import { JAVASCRIPT, TYPESCRIPT, GOLANG, JAVA } from '../../utils/constants.js';

let typewriter;

const template = document.createElement("template");
template.innerHTML = /*html*/`
<style>
	.editor {
		width: 100%;
		border-radius: 2px;
		background-color: var(--white);
		box-shadow: inset 0 0 0 3px var(--black);
		margin-bottom: 1.6rem;
	}

	.editor-buttons {
		padding: 10px;
		background-color: var(--black);
		box-shadow: inset 0 0 0 3px var(--black);
	}

	.editor-button {
		display: inline-block;
		width: 10px;
		height: 10px;
		border-radius: 100%;
	}

	.editor-button:nth-child(1) {
		background: var(--red);
	}

	.editor-button:nth-child(2) {
		background: var(--yellow);
	}

	.editor-button:nth-child(3) {
		background: var(--green);
	}

	.editor-content {
		display: flex;
		line-height: 1.5;
		letter-spacing: normal;
		padding-bottom: 3.2rem;
	}

	.line-numbers {
		display: flex;
		flex-direction: column;
		padding: 10px 0 0 15px;
		margin-right: 10px;
		font-size: 1.6rem;
		font-weight: 700;
		color: var(--dark-gray);
	}

	.editor-text {
		width: 100%;
		padding: 10px 10px 0 0;
		white-space: pre-wrap;
		font-size: 1.6rem;
		font-weight: 700;
		color: var(--dark-gray);
	}

	.editor-footer-buttons {
		display: grid;
		grid-auto-columns: minmax(0, 1fr);
		grid-auto-flow: column;
		gap: 0.8rem;
	}

  .btn {
	  width: 100%;
	  padding: 1.2rem 0;
	  border: none;
	  border-radius: 5.5px;
	  text-decoration: none;
	  font-weight: 500;
	  font-size: 1.8rem;
    position: relative;
  }

  .btn--loading .btn-text {
    visibility: hidden;
    opacity: 0;
  }

  // .btn-text {
  //   transition: all 0.2s;
  // }

  .btn--loading::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border: 4px solid transparent;
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: btn-loading-spinner 1s ease infinite;
  }

  @keyframes btn-loading-spinner {
    from {
        transform: rotate(0turn);
    }

    to {
        transform: rotate(1turn);
    }
  }

  .disabled {
	  cursor: none;
  }

	.javascript {
		color: var(--js-yellow);
		background-color: var(--white);
		box-shadow: inset 0 0 0 3px var(--js-yellow),
			4.11px 4.11px 0 0 rgba(0, 0, 0, 0.25);
		cursor: pointer;
		transition: all color 0.3s;
	}

	.javascript:hover,
	.javascript:focus {
		animation: halftone 0.5s forwards;
		background: radial-gradient(
					circle,
					var(--js-yellow) 0.2em,
					transparent 0.25em
				)
				0 0 / 1.25em 1.25em,
			radial-gradient(circle, var(--js-yellow) 0.2em, transparent 0.25em)
				6.25em 6.25em / 1.25em 1.25em;
		color: var(--white);
	}

	@keyframes halftone {
		100% {
			background-size: 2.375em 2.375em, 0.1em 0.1em;
		}
	}

  .javascript-loading {
    background-color: var(--js-yellow);
    pointer-events: none;
  }

	.typescript {
		color: var(--ts-blue);
		background-size: 100% 200%;
		background-image: linear-gradient(
			to bottom,
			var(--white) 50%,
			var(--ts-blue) 50%
		);
		box-shadow: inset 0 0 0 3px var(--ts-blue),
			4.11px 4.11px 0 0 rgba(0, 0, 0, 0.25);
		cursor: pointer;
		transition: background-position 0.3s;
	}

	.typescript:hover,
	.typescript:focus {
		background-position: 0 -100%;
		color: white;
	}

  .typescript-loading {
    background-position: 0 -100%;
    pointer-events: none;
  }

	.golang {
		color: var(--go-turq);
		background-color: var(--white);
		box-shadow: inset 0 0 0 3px var(--go-turq),
			4.11px 4.11px 0 0 rgba(0, 0, 0, 0.25);
		cursor: pointer;
	}

	.golang:hover,
	.golang:focus {
		animation: stripes-move 0.75s infinite linear;
		background: repeating-linear-gradient(
			45deg,
			var(--go-light) 0,
			var(--go-light) 0.25em,
			transparent 0.25em,
			transparent 0.5em
		);
		color: var(--go-turq);
	}

	@keyframes stripes-move {
		100% {
			background-position: 5em 0px;
		}
	}

  .golang-loading {
    background: var(--go-turq);
    pointer-events: none;
  }

	.java {
		color: var(--java-orange);
		background: none;
		box-shadow: inset 0 0 0 3px var(--java-orange),
			4.11px 4.11px 0 0 rgba(0, 0, 0, 0.25);
		cursor: pointer;
		position: relative;
	}

	.java:before {
		content: '';
		position: absolute;
		z-index: -1;
		border-radius: 5px;
	}

	.java:hover,
	.java:focus {
		color: #fff;
	}

	.java:before {
		height: 0;
		left: 50%;
		top: 50%;
		width: 0;
		background: var(--java-orange);
		transition: width, height, top, left, 0.2s ease-in-out;
	}

	.java:hover:before,
	.java:focus:before {
		height: 100%;
		left: 0;
		top: 0;
		width: 100%;
	}

  .java-loading {
    background-color: var(--java-orange);
  }
</style>
<div class="editor">
	<div class="editor-buttons">
		<div class="editor-button"></div>
		<div class="editor-button"></div>
		<div class="editor-button"></div>
	</div>
	<div class="editor-content">
		<div class="line-numbers">
			<div class="line-number">1</div>
			<div class="line-number">2</div>
			<div class="line-number">3</div>
			<div class="line-number">4</div>
			<div class="line-number">5</div>
			<div class="line-number">6</div>
			<div class="line-number">7</div>
			<div class="line-number">8</div>
			<div class="line-number">9</div>
			<div class="line-number">10</div>
			<div class="line-number">11</div>
			<div class="line-number">12</div>
			<div class="line-number">13</div>
		</div>
		<div class="editor-text"></div>
	</div>
</div>
<div class="editor-footer">
	<div class="editor-footer-buttons">
		<button
			id="lang-button"
			class="btn javascript"
			onclick="this.getRootNode().host.writeJavaScript()"
		>
			<span class="btn-text">JavaScript</span>
		</button>
		<button
			id="lang-button"
			class="btn typescript"
			onclick="this.getRootNode().host.writeTypeScript()"
		>
			<span class="btn-text">TypeScript</span>
		</button>
		<button
			id="lang-button"
			class="btn golang"
			onclick="this.getRootNode().host.writeGolang()"
		>
			<span class="btn-text">Go</span>
		</button>
		<button
			id="lang-button"
			class="btn java"
			onclick="this.getRootNode().host.writeJava()"
		>
			<span class="btn-text">Java</span>
		</button>
	</div>
</div>
`;

export default class HeroEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    typewriter = new TypeWriter(
      this.shadowRoot.querySelector('.editor-text'),
      {
        loop: false,
        typingSpeed: 20,
        deletingSpeed: 10,
      }
    );
    this.writeJavaScript();
  }

  async writeJavaScript() {
    const el = this.shadowRoot.querySelector('.javascript');
    this.disableButton(false);
    el.classList.add('btn--loading', 'javascript-loading');
    await typewriter.deleteAll().typeString(JAVASCRIPT).start();
    this.disableButton(true);
    el.classList.remove('btn--loading', 'javascript-loading');
  }

  async writeTypeScript() {
    const el = this.shadowRoot.querySelector('.typescript');
    this.disableButton(false);
    el.classList.add('btn--loading', 'typescript-loading');
    this.disableButton(false);
    await typewriter.deleteAll().typeString(TYPESCRIPT).start();
    this.disableButton(true);
    el.classList.remove('btn--loading', 'typescript-loading');
  }

  async writeGolang() {
    const el = this.shadowRoot.querySelector('.golang');
    this.disableButton(false);
    el.classList.add('btn--loading', 'golang-loading');
    await typewriter.deleteAll().typeString(GOLANG).start();
    this.disableButton(true);
    el.classList.remove('btn--loading', 'golang-loading');
  }

  async writeJava() {
    const el = this.shadowRoot.querySelector('.java');
    this.disableButton(false);
    el.classList.add('btn--loading', 'java-loading');
    await typewriter.deleteAll().typeString(JAVA).start();
    this.disableButton(true);
    el.classList.remove('btn--loading', 'java-loading');
  }

  disableButton(state) {
    let elements = this.shadowRoot.querySelectorAll('#lang-button');
    elements.forEach((element) => {
      if (state) {
        element.removeAttribute("disabled", "");
        element.setAttribute("enabled", "");
      } else {
        element.removeAttribute("enabled", "");
        element.setAttribute("disabled", "");
      }
    });
  }
}

customElements.define("hero-editor", HeroEditor);
