
export function test(action: string): string {
    if (action === 'sleep') {
        return 'noreaction';
    } else if (action === 'malfunction') {
        return 'repair';
    } else if (action === 'smearMake') {
        return 'oil';
    } else {
        return 'playball';
    }
}