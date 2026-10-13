// Fast Client-Side Parallel Image Compression & Spread Splitter

export interface CompressedImageResult {
  id: string;
  originalName: string;
  originalSizeKb: number;
  compressedSizeKb: number;
  dataUrl: string;
  width: number;
  height: number;
  isSplitLeft?: boolean;
  isSplitRight?: boolean;
}

export interface CompressionProgress {
  total: number;
  completed: number;
  currentFilename: string;
  originalTotalKb: number;
  compressedTotalKb: number;
  percentageSaved: number;
}

// Compress a single image file via HTML5 Canvas
export const compressImageFile = async (
  file: File,
  maxWidth: number = 2560,
  quality: number = 0.82
): Promise<CompressedImageResult> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image element'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Downscale while preserving crisp luxury aspect ratio
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas 2D context not available'));
          return;
        }

        // High quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP or high-quality JPEG fallback
        const outputFormat = 'image/webp';
        let dataUrl = canvas.toDataURL(outputFormat, quality);
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        // Calculate approximate size in KB from base64 string
        const base64Length = dataUrl.length - (dataUrl.indexOf(',') + 1);
        const compressedSizeKb = Math.round((base64Length * 0.75) / 1024);
        const originalSizeKb = Math.round(file.size / 1024);

        resolve({
          id: 'img_' + Math.random().toString(36).substring(2, 9),
          originalName: file.name,
          originalSizeKb,
          compressedSizeKb,
          dataUrl,
          width,
          height,
        });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

// Split a panoramic wedding photo (double page spread) into Left and Right pages
export const splitPanoramicSpread = async (
  dataUrl: string,
  quality: number = 0.85
): Promise<{ leftDataUrl: string; rightDataUrl: string }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = () => reject(new Error('Failed to load spread for splitting'));
    img.onload = () => {
      const halfWidth = Math.floor(img.width / 2);
      const height = img.height;

      // Left Half
      const leftCanvas = document.createElement('canvas');
      leftCanvas.width = halfWidth;
      leftCanvas.height = height;
      const leftCtx = leftCanvas.getContext('2d')!;
      leftCtx.imageSmoothingQuality = 'high';
      leftCtx.drawImage(img, 0, 0, halfWidth, height, 0, 0, halfWidth, height);
      const leftDataUrl = leftCanvas.toDataURL('image/webp', quality);

      // Right Half
      const rightCanvas = document.createElement('canvas');
      rightCanvas.width = img.width - halfWidth;
      rightCanvas.height = height;
      const rightCtx = rightCanvas.getContext('2d')!;
      rightCtx.imageSmoothingQuality = 'high';
      rightCtx.drawImage(
        img,
        halfWidth,
        0,
        img.width - halfWidth,
        height,
        0,
        0,
        img.width - halfWidth,
        height
      );
      const rightDataUrl = rightCanvas.toDataURL('image/webp', quality);

      resolve({ leftDataUrl, rightDataUrl });
    };
    img.src = dataUrl;
  });
};

// Fast Parallel Multi-File Compression with live progress updates
export const compressMultipleFilesParallel = async (
  files: File[],
  onProgress?: (progress: CompressionProgress) => void,
  concurrency: number = 3
): Promise<CompressedImageResult[]> => {
  const results: CompressedImageResult[] = [];
  let completed = 0;
  let originalTotalKb = 0;
  let compressedTotalKb = 0;

  // Process files in parallel batches of size `concurrency`
  for (let i = 0; i < files.length; i += concurrency) {
    const batch = files.slice(i, i + concurrency);
    const batchPromises = batch.map(async (file) => {
      const res = await compressImageFile(file);
      completed++;
      originalTotalKb += res.originalSizeKb;
      compressedTotalKb += res.compressedSizeKb;

      const percentageSaved =
        originalTotalKb > 0
          ? Math.round(((originalTotalKb - compressedTotalKb) / originalTotalKb) * 100)
          : 0;

      if (onProgress) {
        onProgress({
          total: files.length,
          completed,
          currentFilename: file.name,
          originalTotalKb,
          compressedTotalKb,
          percentageSaved,
        });
      }
      return res;
    });

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
  }

  return results;
};
