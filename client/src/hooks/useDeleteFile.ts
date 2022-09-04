import storage from '../firebase';
import { ref, deleteObject } from 'firebase/storage';

const useDeleteFile = () => {
  const deleteFile = async (path: string) => {
    try {
      const desertRef = ref(storage, path);
      await deleteObject(desertRef);

      console.log(`delete file "${path}" success`);
    } catch (error) {
      console.log(error);
    }
  };

  return deleteFile;
};

export default useDeleteFile;
