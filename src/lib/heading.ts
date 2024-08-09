export function getHeading(head: string) {
    let code = head.charCodeAt(0) - 44032;
    let choCode = Math.floor(code / 588);
    let noChoCode = code - 588 * choCode;
    let jungCode = Math.floor(noChoCode / 28);
    let changed = false;
    if (choCode === 5) {
        if ([0, 1, 8, 11, 13, 18].includes(jungCode)) {
            choCode = 2;
            changed = true;
        } else if ([2, 6, 7, 12, 17, 20].includes(jungCode)) {
            choCode = 11;
            changed = true;
        }
    } else if (choCode === 2) {
        if ([6, 12, 17, 20].includes(jungCode)) {
            choCode = 11;
            changed = true;
        }
    }
    if (changed) {
        return [head, String.fromCharCode(noChoCode + choCode * 588 + 44032)];
    } else {
        return [head];
    }
}