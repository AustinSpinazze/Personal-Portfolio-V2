import TypeWriter from './TypeWriter.js';
import { JAVASCRIPT, TYPESCRIPT, GOLANG, JAVA } from '../../utils/constants.js';

let typewriter;

const template = document.createElement("template");
template.innerHTML = /*html*/`
<link
	rel="stylesheet"
	type="text/css"
	href="./js/components/HeroEditor/heroEditor.css"
/>
<link rel="stylesheet" type="text/css" href="../../../styles/style.css" />
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
    <button id="lang-button" class="btn javascript" onclick="this.getRootNode().host.writeJavaScript()">JavaScript</button>
    <button id="lang-button" class="btn typescript" onclick="this.getRootNode().host.writeTypeScript()">TypeScript</button>
    <button id="lang-button" class="btn golang" onclick="this.getRootNode().host.writeGolang()">Go</button>
    <button id="lang-button" class="btn java" onclick="this.getRootNode().host.writeJava()">Java</button>
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
    this.disableButton(false);
    await typewriter.deleteAll().typeString(JAVASCRIPT).start();
    this.disableButton(true);
  }

  async writeTypeScript() {
    this.disableButton(false);
    await typewriter.deleteAll().typeString(TYPESCRIPT).start();
    this.disableButton(true);
  }

  async writeGolang() {
    this.disableButton(false);
    await typewriter.deleteAll().typeString(GOLANG).start();
    this.disableButton(true);
  }

  async writeJava() {
    this.disableButton(false);
    await typewriter.deleteAll().typeString(JAVA).start();
    this.disableButton(true);
  }

  disableButton(state) {
    let elements = this.shadowRoot.querySelectorAll('#lang-button');
    elements.forEach((button) => {
      console.log(button, state);
      if (state) {
        button.removeAttribute("disabled", "");
        button.setAttribute("enabled", "");
      } else {
        button.removeAttribute("enabled", "");
        button.setAttribute("disabled", "");
      }
    });
  }
}

customElements.define("hero-editor", HeroEditor);
