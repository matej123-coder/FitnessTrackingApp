export function fromIsoDuration(iso: string): string {
    const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!match) return iso;

    const hours = match[1] ? `${match[1]}h ` : "";
    const minutes = match[2] ? `${match[2]}m` : "";

    return (hours + minutes).trim();
}