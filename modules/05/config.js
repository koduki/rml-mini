class Config {
  constructor() {
    this._is_show_console = true;
  }

  is_show_console() {
    return this._is_show_console;
  }

  disable_console() {
    this._is_show_console = false;
  }

  enable_console() {
    this._is_show_console = true;
  }
}

export default new Config();
