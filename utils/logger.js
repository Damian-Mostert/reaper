class Logger {
    constructor() {
      this.types = {
        success: { emoji: '✅', color: 'green' },
        error: { emoji: '❌', color: 'red' },
        info: { emoji: '🚀', color: 'blue' },
        warning: { emoji: '⚠️', color: 'orange' },
        debug: { emoji: '🐛', color: 'purple' },
        loading: { emoji: '⏳', color: 'gray' },
        event: { emoji: '🎉', color: 'magenta' }
      };
    }
    log(type, message) {
      if (!this.types[type]) {
        console.warn('%c[Logger] Invalid log type:', 'color: orange;', type);
        return;
      }
      const { emoji, color } = this.types[type];
      console.log(`%c${emoji} ${message}`, `color: ${color}; font-weight: bold;`);
    }
  }
  
  const logger = new Logger();
  module.exports = logger
  