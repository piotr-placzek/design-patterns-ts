export type UUID = string;

export function createUuid(): UUID {
    const time: number = new Date().getTime();
    const uuid: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return uuid.replace(/[xy]/g, (c: string): string => {
        const r: number = (time + Math.random() * 16) % 16 | 0;
        return c == 'x' ? r.toString() : (r & 0x3 | 0x8).toString(16);
    });
}