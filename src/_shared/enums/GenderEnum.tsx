export enum GenderEnum {
    Female = 'f',
    Male = 'm',
    Other = 'o'
}

export function getGenderKeys(): string[] {
    return Object.keys(GenderEnum);
}

export function getGenderLabel(gender: string): string | undefined {
    const label = Object.entries(GenderEnum).find(([key, value]) => value === gender);
    return label ? label[0] : undefined;
  }