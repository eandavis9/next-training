export function camelCaseToWords(input: string): string {
    const words = input.replace(/_/g, ' ').split(' ');
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(' ');
}