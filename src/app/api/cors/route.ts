// import { NextRequest, NextResponse } from 'next/server';
// import axios from 'axios';

// export async function GET(req: NextRequest) {
//     try {
//         const { searchParams } = new URL(req.url);
//         const url = searchParams.get('url');

//         if (!url || typeof url !== 'string') {
//             return NextResponse.json({ error: 'Invalid or missing redirect_url parameter.' }, { status: 400 });
//         }

//         const response = await axios.get(url, {
//             headers: {
//                 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
//                 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
//                 'Accept-Language': 'en-US,en;q=0.5',
//                 'Accept-Encoding': 'gzip, deflate, br',
//                 'Connection': 'keep-alive',
//             }
//         });

//         return NextResponse.json(response.data);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return NextResponse.json({ error: 'Failed to fetch data from the provided URL.' }, { status: 500 });
//     }
// }

import { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');

    if (!url) {
        return res.status(400).json({ error: 'No URL provided' });
    }

    https.get(url, (proxyRes) => {
        // Set CORS headers
        res.headers.set('Access-Control-Allow-Origin', '*');
        res.headers.set('Access-Control-Allow-Methods', 'GET');
        res.headers.set('Access-Control-Allow-Headers', 'Content-Type');

        // Pipe the response from the proxied request to the client
        proxyRes.pipe(res);
    }).on('error', (err) => {
        res.status(500).json({ error: 'Error proxying request' });
    });
}
