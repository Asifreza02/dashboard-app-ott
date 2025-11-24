import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export interface TrackData {
    id: string;
    songName: string;
    albumName: string;
    artistName: string;
    streams: number;
    revenue: number;
    platform: 'Airtel' | 'JioSaavn' | 'Wynk';
    streamType?: string; // For breakdown if available
}

export interface ChartData {
    name: string;
    value?: number;
    [key: string]: any;
}

export interface TableData {
    name: string;
    revenue: number;
    total: number; // Could be streams or another metric
    code?: string; // For project code if available
}

const parseCSV = (filePath: string): Promise<any[]> => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return new Promise((resolve) => {
        Papa.parse(fileContent, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => resolve(results.data),
        });
    });
};

export const getDashboardData = async (): Promise<TrackData[]> => {
    const dataDir = path.join(process.cwd(), 'public', 'data');

    const airtelData = await parseCSV(path.join(dataDir, 'airtel-report.csv'));
    const jioData = await parseCSV(path.join(dataDir, 'jiosaavn-report.csv'));
    const wynkData = await parseCSV(path.join(dataDir, 'wynk-report.csv'));

    const normalizedData: TrackData[] = [];

    // Process Airtel
    airtelData.forEach((row: any, index) => {
        if (row['Song Name']) {
            normalizedData.push({
                id: `airtel-${index}`,
                songName: row['Song Name'],
                albumName: row['Album Name'] || '',
                artistName: row['Artist'] || '',
                streams: 0,
                revenue: parseFloat(row['Rev']) || 0,
                platform: 'Airtel',
            });
        }
    });

    // Process JioSaavn
    jioData.forEach((row: any, index) => {
        if (row['song_name']) {
            normalizedData.push({
                id: `jio-${index}`,
                songName: row['song_name'],
                albumName: row['album_name'] || '',
                artistName: row['artist_name'] || '',
                streams: parseInt(row['total']) || 0,
                revenue: parseFloat(row['income']) || 0,
                platform: 'JioSaavn',
            });
        }
    });

    // Process Wynk
    wynkData.forEach((row: any, index) => {
        if (row['song_name']) {
            normalizedData.push({
                id: `wynk-${index}`,
                songName: row['song_name'],
                albumName: row['album_name'] || '',
                artistName: row['artist'] || '',
                streams: parseInt(row['total']) || 0,
                revenue: parseFloat(row['income']) || 0,
                platform: 'Wynk',
            });
        }
    });

    return normalizedData;
};

// --- MOCK DATA GENERATORS ---

export const getRevenueTrendData = (): ChartData[] => {
    return [
        { name: 'Sep-24', revenue: 10 },
        { name: 'Oct-24', revenue: 12 },
        { name: 'Nov-24', revenue: 11 },
        { name: 'Dec-24', revenue: 22 },
        { name: 'Jan-25', revenue: 13 },
        { name: 'Feb-25', revenue: 12 },
        { name: 'Mar-25', revenue: 13 },
        { name: 'Apr-25', revenue: 21 },
        { name: 'May-25', revenue: 43 },
        { name: 'Jun-25', revenue: 15 },
        { name: 'Jul-25', revenue: 12 },
        { name: 'Aug-25', revenue: 21 },
        { name: 'Sep-25', revenue: 33 },
    ];
};

export const getStreamingTrendData = (): ChartData[] => {
    return [
        { name: 'Fraudulent Streams', value: 1.0, fill: '#F28B82' },
        { name: 'Unqualified Audio', value: 21.6, fill: '#F28B82' },
        { name: 'Cloud Match Units', value: 41.9, fill: '#8AB4F8' },
        { name: 'Streaming Bonus', value: 0.3, fill: '#F28B82' },
        { name: 'Download Tracks', value: 23.7, fill: '#34A853' },
        { name: 'Short-form Video User', value: 5.1, fill: '#FBBC04' },
        { name: 'Ad-Supported Audio', value: 5.9, fill: '#4285F4' },
    ];
};

export const getCallerTuneData = (): any[] => {
    const data = [];
    for (let i = 0; i < 20; i++) {
        data.push({
            name: `Tune ${i + 1}`,
            vi: Math.floor(Math.random() * 30) + 20,
            airtel: Math.floor(Math.random() * 30) + 20,
            jio: Math.floor(Math.random() * 30) + 20,
        });
    }
    return data;
};

export const getCountryData = (): any[] => {
    // Mock data for the map
    return [
        { id: 'USA', value: 80 },
        { id: 'IND', value: 120 },
        { id: 'CHN', value: 60 },
        { id: 'BRA', value: 40 },
        { id: 'AUS', value: 30 },
        { id: 'RUS', value: 20 },
    ];
};
