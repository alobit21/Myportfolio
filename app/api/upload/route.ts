import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export async function POST(request: Request) {
  try {
    // Debug: Log env var presence (not values for security)
    console.log('Cloudinary env check:', {
      hasCloudName: !!process.env.CLOUDINARY_CLOUD_NAME,
      hasApiKey: !!process.env.CLOUDINARY_API_KEY,
      hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKeyLen: process.env.CLOUDINARY_API_KEY?.length,
      apiSecretLen: process.env.CLOUDINARY_API_SECRET?.length,
    });

    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Cloudinary environment variables missing');
      return NextResponse.json({ error: 'Cloudinary not configured properly' }, { status: 500 });
    }

    // Configure Cloudinary inside the request handler with trimmed values
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
      api_key: process.env.CLOUDINARY_API_KEY?.trim(),
      api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
    });

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'portfolio';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: folder,
      resource_type: 'auto',
    });

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error: any) {
    console.error('Upload error details:', error);
    return NextResponse.json(
      { error: 'Failed to upload image', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json({ error: 'No public ID provided' }, { status: 400 });
    }

    await cloudinary.uploader.destroy(publicId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
