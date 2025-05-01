import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import imageCompression from 'browser-image-compression';

export const compressImageToMax1MB = async (imageFile: File): Promise<File> => {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920, // Adjust as needed
        useWebWorker: true,
        initialQuality: 0.6,
    };

    try {
        const compressedFile = await imageCompression(imageFile, options);
        console.log(`Original size: ${(imageFile.size / 1024 / 1024).toFixed(2)} MB`);
        console.log(`Compressed size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);
        return compressedFile;
    } catch (error) {
        console.error("Compression error:", error);
        throw error;
    }
};

export const uploadItemImage = async (img: File): Promise<string | null> => {
    if (!img) return null;

    try {
        const compressed = await compressImageToMax1MB(img);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + compressed.name;
        const storageRef = ref(storage, `items/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, compressed);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress.toFixed(2) + '% done');
                },
                (error) => {
                    console.error('Upload error:', error);
                    reject(error);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve(downloadURL);
                    } catch (err) {
                        reject(err);
                    }
                }
            );
        });
    } catch (err) {
        console.error('Image compression or upload failed:', err);
        return null;
    }
};



