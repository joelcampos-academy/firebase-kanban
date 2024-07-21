import { getBlob, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseStorage } from "../../utils/firebase/setup-firebase.util";

export class StorageService {
  static uploadDepartmentImage = async (file: File, departmentId: string) => {
    // Referencia al archivo
    const fileRef = ref(firebaseStorage, `departments/${departmentId}.png`);

    return await uploadBytes(fileRef, file);
  };

  static downloadDepartmentImage = async (departmentId: string) => {
    // Referencia al archivo
    const fileRef = ref(firebaseStorage, `departments/${departmentId}.png`);

    // Descarga del blob
    const blob = await getBlob(fileRef);

    // Creamos la URL al blob (URL local)
    const blobUrl = URL.createObjectURL(blob);

    window.open(blobUrl, "_blank");
  };

  static getDepartmentImageUrl = async (departmentId: string) => {
    // Referencia al archivo
    const fileRef = ref(firebaseStorage, `departments/${departmentId}.png`);

    const url = await getDownloadURL(fileRef);

    return url;
  };
}
