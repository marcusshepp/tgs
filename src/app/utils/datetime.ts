/**
 * Parse a CMS datetime string into a UTC Date instant, treating naive
 * (offset-less) values as America/Detroit local wall-clock time.
 *
 * Why this exists: CMS `datetime` fields can be stored either as ISO with
 * an offset (`...Z` or `...-04:00`) or naive (`2026-05-16T17:00`). Calling
 * `new Date(naive)` parses as the runtime's local zone — which means SSR
 * (UTC on the server) and the browser (Detroit on the user's machine)
 * disagree about the same string by the local UTC offset, so "ordering
 * opens" countdowns flip 4-5h before/after they should.
 *
 * Tim's events are entered in Detroit, take place in Detroit, and the
 * display formatters already render in Detroit — so naive values here
 * are unambiguously America/Detroit wall-clock.
 */

const DETROIT_TZ = 'America/Detroit';

const HAS_TZ_SUFFIX = /(?:Z|[+-]\d{2}:?\d{2})$/;

const detroitParts = new Intl.DateTimeFormat('en-US', {
    timeZone: DETROIT_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
});

interface WallClock {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
}

function detroitWallClockOf(instant: Date): WallClock {
    const parts: Record<string, string> = {};
    for (const p of detroitParts.formatToParts(instant)) {
        if (p.type !== 'literal') parts[p.type] = p.value;
    }
    return {
        year: Number(parts['year']),
        month: Number(parts['month']),
        day: Number(parts['day']),
        // Intl with hour12:false emits "24" at midnight on some engines.
        hour: Number(parts['hour']) % 24,
        minute: Number(parts['minute']),
        second: Number(parts['second']),
    };
}

function wallClockToUtcMs(wc: WallClock): number {
    return Date.UTC(wc.year, wc.month - 1, wc.day, wc.hour, wc.minute, wc.second);
}

/**
 * Returns the UTC Date that, when displayed in America/Detroit, reads as
 * the given wall-clock components. Two iterations are sufficient to land
 * on a stable answer through DST transitions.
 */
function detroitWallClockToUtc(wc: WallClock): Date {
    const targetMs = wallClockToUtcMs(wc);
    let guess = new Date(targetMs);
    for (let i = 0; i < 2; i++) {
        const drift = wallClockToUtcMs(detroitWallClockOf(guess)) - targetMs;
        if (drift === 0) break;
        guess = new Date(guess.getTime() - drift);
    }
    return guess;
}

/**
 * Parse a CMS datetime string. Strings with an explicit offset/Z are
 * passed through to `new Date(...)`. Naive strings are interpreted as
 * America/Detroit wall-clock and resolved to the corresponding UTC instant.
 *
 * Returns `null` for empty / unparseable input so callers can branch
 * without inventing an "epoch" sentinel that would silently flip
 * countdowns into the past.
 */
export function parseCmsDateTime(value: string | null | undefined): Date | null {
    if (!value) return null;
    const trimmed = value.trim();
    if (!trimmed) return null;

    if (HAS_TZ_SUFFIX.test(trimmed)) {
        const d = new Date(trimmed);
        return isNaN(d.getTime()) ? null : d;
    }

    const match = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?/.exec(trimmed);
    if (!match) {
        const fallback = new Date(trimmed);
        return isNaN(fallback.getTime()) ? null : fallback;
    }

    return detroitWallClockToUtc({
        year: Number(match[1]),
        month: Number(match[2]),
        day: Number(match[3]),
        hour: Number(match[4]),
        minute: Number(match[5]),
        second: match[6] ? Number(match[6]) : 0,
    });
}
