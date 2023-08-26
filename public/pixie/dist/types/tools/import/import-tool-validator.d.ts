import { UploadValidator } from '../../common/uploads/validation/upload-validator';
export declare class ImportToolValidator extends UploadValidator {
    protected readonly DEFAULT_MAX_FILE_SIZE_MB = 10;
    showToast: boolean;
    protected initValidations(): void;
    protected getMaxFileSize(): number;
    protected getAllowedExtensions(): string[];
}
