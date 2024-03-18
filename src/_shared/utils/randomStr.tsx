import moment from 'moment';

export const generateRandomWords = (wordCount: number) => {
    const words: string[] = [
        'Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur',
        'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor',
        'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua'
    ];

    let randomText: string = '';

    for (let i = 0; i < wordCount; i++) {
        const randomIndex: number = Math.floor(Math.random() * words.length);
        randomText += words[randomIndex] + ' ';
    }
    
    return randomText.trim(); 
};

export const generateRandomDate = (daysAgo: number) => {
    const today = moment();
    const pastDate = moment(today).subtract(Math.floor(Math.random() * daysAgo), 'days');
    return pastDate.format('MMM D YYYY');
}
