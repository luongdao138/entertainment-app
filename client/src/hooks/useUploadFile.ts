import { startTransition, useState } from 'react';
import storage from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';

const useUploadFile = (initialUrl?: string) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [url, setUrl] = useState<string | undefined>(initialUrl);

  const handleUploadFile = (file: File, path: string) => {
    setIsUploading(true);
    const fileName = uuid() + '_' + file.name;
    const storageRef = ref(storage, `${path}${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const byteTransfered = snapshot.bytesTransferred;
        const totalBytes = snapshot.totalBytes;

        startTransition(() => {
          setProgress(Math.ceil((byteTransfered * 100) / totalBytes));
        });
      },
      (error) => {
        console.log(error);
        setIsUploading(false);
        setProgress(0);
        toast.error('Tải ảnh lên thất bại');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log('Upload image success: ', url);
          setUrl(url);
          setProgress(0);
          setIsUploading(false);
        });
      }
    );
  };

  return {
    isUploading,
    progress,
    url,
    handleUploadFile,
  };
};

export default useUploadFile;
