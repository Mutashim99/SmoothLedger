/* File: app/api/indexnow/route.js */

import { NextResponse } from 'next/server';

export async function GET() {
  // --- CONFIGURATION ---
  const HOST = 'smoothledger.com';
  // 👇 REPLACE THIS with the long code from your downloaded file name
  const API_KEY = '94eadf8476144fbbb7ecb6989e339656'; 
  const KEY_LOCATION = `https://${HOST}/${API_KEY}.txt`;
  const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

  try {
    // 1. Fetch your live sitemap
    // We use { cache: 'no-store' } to ensure we get the latest version
    const sitemapResponse = await fetch(SITEMAP_URL, { cache: 'no-store' });
    
    if (!sitemapResponse.ok) {
      throw new Error(`Failed to fetch sitemap: ${sitemapResponse.statusText}`);
    }

    const sitemapXml = await sitemapResponse.text();

    // 2. Extract URLs dynamically using Regex
    // This finds everything between <loc> and </loc> tags
    const matches = sitemapXml.match(/<loc>(.*?)<\/loc>/g);

    if (!matches || matches.length === 0) {
      return NextResponse.json({ error: "No URLs found in sitemap" }, { status: 400 });
    }

    // Clean up the tags to get raw URLs
    const urlList = matches.map((tag) => tag.replace(/<\/?loc>/g, ''));

    // 3. Prepare the payload for Bing
    const payload = {
      host: HOST,
      key: API_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urlList,
    };

    console.log(`Submitting ${urlList.length} URLs to IndexNow...`);

    // 4. Send to IndexNow API
    const indexResponse = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!indexResponse.ok) {
      const errorText = await indexResponse.text();
      return NextResponse.json({ 
        success: false, 
        error: errorText, 
        status: indexResponse.status 
      }, { status: 500 });
    }

    // 5. Success!
    return NextResponse.json({
      success: true,
      message: `Successfully submitted ${urlList.length} URLs to Bing/IndexNow.`,
      submittedUrlsCount: urlList.length,
    });

  } catch (error) {
    console.error("IndexNow Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}