import { CustomVideoElement } from 'custom-media-element';

const MATCH_SRC = /rumble\.com\/embed\/(\w+)/;

class RumbleVideoElement extends CustomVideoElement {
  static shadowRootOptions = { ...CustomVideoElement.shadowRootOptions };

  static getTemplateHTML = (attrs) => {
    const { src, ...rest } = attrs; // eslint-disable-line no-unused-vars
    return CustomVideoElement.getTemplateHTML(rest);
  };

  #apiInit;

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName !== 'src') {
      super.attributeChangedCallback(attrName, oldValue, newValue);
    }

    if (attrName === 'src' && oldValue != newValue) {
      this.load();
    }
  }

  async load() {
    if (!this.#apiInit) {
      this.#apiInit = true;

      let Rumble = globalThis.Rumble;
      if (!Rumble) {
        const scriptUrl = `https://rumble.com/embedJS/ut38jj/?url=${encodeURIComponent(location.href)}`;
        Rumble = await loadScript(scriptUrl, 'Rumble');
      }
      console.log('src:', this.src)
      const matches = this.src.match(MATCH_SRC);
      const srcId = matches && matches[1];

      this.api = await Rumble("play", { "video": srcId, "div": `rumble_video` })
      const rumbleContainer = document.querySelector('#rumble_video')
      const rumbleVideo = rumbleContainer.querySelector('video')
      console.log(`🚀 ~ RumbleVideoElement ~ load ~ rumbleVideo:`, rumbleVideo)
      const rumbleSrc = rumbleVideo.querySelector('video').src
      console.log(`🚀 ~ RumbleVideoElement ~ load ~ rumbleSrc:`, rumbleSrc)
    } else {
      const matches = this.src.match(MATCH_SRC);
      const srcId = matches && matches[1];
      console.log(`🚀 ~ RumbleVideoElement ~ load ~ srcId:`, srcId)
      this.api = Rumble("play", { "video": srcId, "div": `rumble_video` });
    }
  }
}

const loadScriptCache = {};
async function loadScript(src, globalName) {
  if (!globalName) return import(/* webpackIgnore: true */ src);
  if (loadScriptCache[src]) return loadScriptCache[src];
  if (self[globalName]) return self[globalName];
  return (loadScriptCache[src] = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.defer = true;
    script.src = src;
    script.onload = () => resolve(self[globalName]);
    script.onerror = reject;
    document.head.append(script);
  }));
}

if (globalThis.customElements && !globalThis.customElements.get('rumble-video')) {
  globalThis.customElements.define('rumble-video', RumbleVideoElement);
}

export default RumbleVideoElement;
