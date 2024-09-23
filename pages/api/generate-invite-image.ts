// pages/api/generate-invite-image.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createCanvas, loadImage, registerFont } from 'canvas';
import path from 'path';
import fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Generating invite image...');
  const { inviteCode } = req.query;

  if (!inviteCode || typeof inviteCode !== 'string') {
    console.error('Invalid invite code');
    return res.status(400).json({ error: 'Invalid invite code' });
  }

  try {
    // Register a font (make sure to have this font file in your project)
    const fontPath = path.join(process.cwd(), 'public', 'fonts', 'Arial.ttf');
    if (fs.existsSync(fontPath)) {
      registerFont(fontPath, { family: 'Arial' });
    } else {
      console.warn('Font file not found, using system default');
    }

    // Create a canvas
    const width = 1200;
    const height = 675;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Load background image
    const backgroundPath = path.join(process.cwd(), 'public', 'assets', 'invite-background.jpg');
    console.log('Loading background image from:', backgroundPath);
    if (!fs.existsSync(backgroundPath)) {
      console.error('Background image not found');
      return res.status(500).json({ error: 'Background image not found' });
    }
    const backgroundImage = await loadImage(backgroundPath);
    ctx.drawImage(backgroundImage, 0, 0, width, height);

    // Add text
    ctx.font = 'bold 120px Arial';
    ctx.fillStyle = '#00e599';
    ctx.textAlign = 'center';
    ctx.fillText(inviteCode, width / 2 + 170, height / 2 - 50);

    // Convert canvas to buffer
    const buffer = canvas.toBuffer('image/jpeg');

    // Send the image
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(buffer);

    console.log('Image generated and sent successfully');
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Error generating image' });
  }
}