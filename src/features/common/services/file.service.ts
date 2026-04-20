import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface SaveFileOptions {
  folder: string;        // e.g. 'images', 'documents', 'avatars'
  allowedMimeTypes?: string[];
  maxSizeBytes?: number;
}

@Injectable()
export class FileService {
  private readonly uploadsRoot: string;
  private readonly baseUrl: string;

  constructor(private readonly config: ConfigService) {
    this.uploadsRoot = this.config.getOrThrow<string>('UPLOADS');
    this.baseUrl = this.config.getOrThrow<string>('BASE_URL');
  }

  /**
   * Saves a Multer file to uploads/<folder>/ and returns the relative path.
   * e.g. "uploads/images/image_1234567890.png"
   */
  async save(file: Express.Multer.File, options: SaveFileOptions): Promise<string> {
    this.validate(file, options);

    const folder = path.join(this.uploadsRoot, options.folder);
    await fs.mkdir(folder, { recursive: true });

    const filename = this.generateFilename(file);
    const relativePath = path.join(folder, filename);   // "uploads/images/image_1234.png"

    await fs.writeFile(relativePath, file.buffer);

    return relativePath;
  }

  /**
   * Deletes a file by its stored relative path.
   * Silently ignores if the file doesn't exist.
   */
  // async delete(relativePath: string): Promise<void> {
  //   if (!relativePath) return;
  //
  //   try {
  //     await fs.unlink(relativePath);
  //   } catch (error) {
  //     if (error.code !== 'ENOENT') throw error; // rethrow unexpected errors
  //   }
  // }

  /**
   * Checks whether a file actually exists on disk.
   */
  async exists(relativePath: string): Promise<boolean> {
    try {
      await fs.access(relativePath);
      return true;
    } catch {
      return false;
    }
  }

  getUrl(relativePath: string): string | null {
    if (!relativePath) return null;
    return `${this.baseUrl}/${relativePath}`;
  }

  validate(file: Express.Multer.File, options: Pick<SaveFileOptions, 'allowedMimeTypes' | 'maxSizeBytes'>): void {
    if (options.allowedMimeTypes?.length && !options.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type "${file.mimetype}". Allowed: ${options.allowedMimeTypes.join(', ')}`
      );
    }

    if (options.maxSizeBytes && file.size > options.maxSizeBytes) {
      const limitMb = (options.maxSizeBytes / (1024 * 1024)).toFixed(1);
      throw new BadRequestException(`File exceeds the maximum allowed size of ${limitMb}MB`);
    }
  }

  private generateFilename(file: Express.Multer.File): string {
    const ext = path.extname(file.originalname);        // ".png"
    const base = path.basename(file.originalname, ext)  // "avatar"
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_');                      // sanitize
    return `${base}_${Date.now()}${ext}`;               // "avatar_1234567890.png"
  }
}