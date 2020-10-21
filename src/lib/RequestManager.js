class RequestManager {
    constructor(options) {
        this.options = { timeout: 10000, ...options };
        this.map = {};
        this.timerId = null;
        this.startPollTimeout();
    }
    set(key, context) {
        if (typeof context.cb !== 'function') {
            throw new Error('cb is required');
        }
        this.map[key] = {
            startTime: Date.now(),
            ...context,
        };
    }
    get(key) {
        return this.map[key];
    }
    del(key) {
        return delete this.map[key];
    }
    exec(key, data) {
        const context = this.get(key);
        if (context) {
            this.del(key);
            context.cb(data);
        }
    } 
    startPollTimeout() {
        this.timerId = setTimeout(() => {
            if (!this.timerId) {
                return;
            }
            const nextMap = {};
            for (const [key, context] of Object.entries(this.map)) {
                if (Date.now() - context.startTime < (context.timeout || this.options.timeout)) {
                    nextMap[key] = context;
                } else {
                    context.cb(new Error('timeout'));
                }
            }
            this.map = nextMap;
            this.startPollTimeout();
        }, 1000);
    }
}

module.exports = RequestManager;