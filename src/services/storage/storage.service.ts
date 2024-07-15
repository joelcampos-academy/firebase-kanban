import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseStorage } from "../../utils/firebase/setup-firebase.util";

export class StorageService {
  static uploadDepartmentImage = async (file: File, departmentId: string) => {
    // Reference to the file
    const fileRef = ref(firebaseStorage, `departments/${departmentId}.png`);

    return await uploadBytes(fileRef, file);
  };

  static getDepartmentImageUrl = async (departmentId: string) => {
    // Reference to the file
    const fileRef = ref(firebaseStorage, `departments/${departmentId}.png`);

    const url = await getDownloadURL(fileRef);

    return url;
  };
}
