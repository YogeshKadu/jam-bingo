export class AudioController {
  constructor() {
    this.sounds = new Map();
    this.activeSounds = [];

    this.masterVolume = 1;
    this.muted = false;
  }
  #randomKey(length = 8) {
    return crypto.randomUUID().replaceAll("-", "").slice(0, length);
  }
  #removeFromActiveSounds(key){
    this.activeSounds = this.activeSounds.filter(item => item.key !== key);
  }

  load(name, src) {
    const audio = new Audio(src);
    audio.preload = "auto";
    this.sounds.set(name, audio);
  }

  play(name, { loop = false } = {}) {
    if (this.muted) return;

    const original = this.sounds.get(name);
    const key = this.#randomKey();

    if (!original) {
      console.warn(`Sound "${name}" not found`);
      return;
    }

    const audio = original.cloneNode();

    audio.volume = this.masterVolume;
    audio.loop = loop;
    const item = {key, audio};
    this.activeSounds.push(item);

    audio.play().catch(() => {
      this.#removeFromActiveSounds(key);
    });

    audio.addEventListener("ended", () => {
      this.#removeFromActiveSounds(key);
    });

    return audio;
  }

  stop(key) {
    const item = this.activeSounds.find(item => item.key === key);

    if (!item) return;

    const { audio } = item;

    audio.pause();
    audio.currentTime = 0;

    this.#removeFromActiveSounds(key);
  }
  setMuteState(state) {
    this.muted = state;
  }

  stopAll() {
    this.activeSounds.forEach((item) => {
        const { key, audio } = item;
        audio.pause();
        audio.currentTime = 0;
    });
    this.activeSounds = [];
  }
}