import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { DepartmentModel } from "../../models/department/department.model";
import { firestoreDatabase } from "../../utils/firebase/setup-firebase.util";
import { TaskModel } from "../../models/kanban/task.model";

export class KanbanDatabaseService {
  /**
   * Esta función devuelve la referencia a la colección 'departments'.
   * Al obtener una referencia no se realiza ninguna lectura a la DB.
   * Podemos entender una referencia como una ruta que luego utilizaremos para leer o escribir en la DB.
   */
  private static getDepartmentsCollectionRef = () => {
    return collection(firestoreDatabase, "departments");
  };

  /**
   * Esta función crea un nuevo documento dentro de la colección kanban ('/departments').
   * Ejemplo: '/departments/1234' siendo 1234 el ID del nuevo documento.
   * En el documento se almacenan los datos que se han pasado en 'departmentInfo'.
   */
  static createDepartment = async (departmentInfo: DepartmentModel) => {
    const departmentCollection = this.getDepartmentsCollectionRef();

    return await addDoc(departmentCollection, departmentInfo);
  };

  /**
   * Esta función lee un departamento a partir del id de documento.
   * Primero obtenemos la referencia de la colección 'departments'.
   */
  static getDepartment = async (departmentId: string) => {
    const departmentCollection = this.getDepartmentsCollectionRef();
    const docRef = doc(departmentCollection, departmentId);

    return await getDoc(docRef);
  };

  /**
   * Esta función lee todos los departamentos que hay dentro de la colección 'departments'.
   */
  static getDepartments = async () => {
    const departmentCollection = this.getDepartmentsCollectionRef();

    return await getDocs(departmentCollection);
  };

  /**
   * Esta función elimina el documento de un departamento por id.
   */
  static removeDepartment = async (departmentId: string) => {
    const kanbanCollection = this.getDepartmentsCollectionRef();

    await deleteDoc(doc(kanbanCollection, departmentId));
  };

  /**
   * Esta función nos devuelve todas las tareas que formen parte del kanban de un departamento.
   * Se obtienen de la ruta '/departments/{departmentId}/kanban
   */
  static getDepartmentTasks = async (departmentId: string) => {
    const kanbanCollectionRef = collection(
      firestoreDatabase,
      "departments",
      departmentId,
      "kanban"
    );

    const kanbanDocs = await getDocs(kanbanCollectionRef);

    // Procesamos el array de documentos. Nos quedamos con:
    //   - El .id     -> Es el id del documento.
    //   - El .data() -> Es el contenido del documento.
    const processedKanbanDocs = kanbanDocs.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as TaskModel),
    }));
    return processedKanbanDocs;
  };
}
