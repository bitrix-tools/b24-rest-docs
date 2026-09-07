'use strict';

// Скользящее окно на ключ. Нужен и для приёма событий (никто не должен
// уметь накрутить статистику одним циклом), и для формы входа.

class RateLimiter {
    constructor(limit, windowMs, maxKeys) {
        this.limit = limit;
        this.windowMs = windowMs;
        this.maxKeys = maxKeys || 20000;
        this.hits = new Map();
    }

    check(key) {
        const now = Date.now();
        const bucket = (this.hits.get(key) || []).filter((time) => now - time < this.windowMs);
        bucket.push(now);
        this.hits.set(key, bucket);

        if (this.hits.size > this.maxKeys) {
            // Защита от роста памяти: чистим окончательно протухшие ключи,
            // и только если это не помогло — сбрасываем всё.
            for (const [k, times] of this.hits) {
                if (!times.length || now - times[times.length - 1] > this.windowMs) {
                    this.hits.delete(k);
                }
            }
            if (this.hits.size > this.maxKeys) {
                this.hits.clear();
            }
        }

        return bucket.length <= this.limit;
    }
}

module.exports = { RateLimiter };
