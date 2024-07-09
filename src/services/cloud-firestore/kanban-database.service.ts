import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
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

  private static getDepartmentKanbanCollectionRef = (departmentId: string) => {
    return collection(firestoreDatabase, "departments", departmentId, "kanban");
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
    const kanbanCollectionRef =
      this.getDepartmentKanbanCollectionRef(departmentId);

    // Leemos los documentos de la DB
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

  /**
   * Esta función escucha los cambios que se producen en el kanban de un departamento.
   * Se obtienen de la ruta '/departments/{departmentId}/kanban
   * Cuando se detecta un cambio se llama a la función que se pasa por parámetro.
   */
  static omDepartmentTasksChange = (
    departmentId: string,
    onChange: (tasks: ({ id: string } & TaskModel)[]) => void
  ) => {
    const kanbanCollectionRef =
      this.getDepartmentKanbanCollectionRef(departmentId);

    return onSnapshot(kanbanCollectionRef, (snapshot) => {
      // Procesamos el array de documentos. Nos quedamos con:
      //   - El .id     -> Es el id del documento.
      //   - El .data() -> Es el contenido del documento.
      const processedKanbanDocs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as TaskModel),
      }));

      onChange(processedKanbanDocs);
    });
  };

  /**
   * Esta función elimina un documento de la colección 'kanban' situada dentro de un departamento.
   * Se le proporciona el id de departamento y el id de tarea. A partir de estos datos se genera la ruta
   * al documento que se va a eliminar: 'departments/{departmentId}/kanban/{taskId}'
   */
  static removeDepartmentTask = async (
    departmentId: string,
    taskId: string
  ) => {
    const kanbanCollectionRef =
      this.getDepartmentKanbanCollectionRef(departmentId);

    // Eliminamos el documento de la DB
    await deleteDoc(doc(kanbanCollectionRef, taskId));
  };

  /**
   * Esta función actualiza un documento de la colección 'kanban' situada dentro de un departamento.
   * Se le proporciona el id de departamento y el id de tarea. A partir de estos datos se genera la ruta
   * al documento que se va a actualizar: 'departments/{departmentId}/kanban/{taskId}'.
   * Finalmente se le proporciona un parámetro con los nuevos datos del documento (taskData).
   */
  static updateDepartmentTask = async (
    departmentId: string,
    taskId: string,
    taskData: TaskModel
  ) => {
    const kanbanCollectionRef =
      this.getDepartmentKanbanCollectionRef(departmentId);

    // Actualizamos el documento de la DB
    await updateDoc(doc(kanbanCollectionRef, taskId), { ...taskData });
  };

  /**
   * Esta función crea un documento de la colección 'kanban' situada dentro de un departamento.
   * Se le proporciona el id de departamento: 'departments/{departmentId}/kanban'. Al nuevo documento se le asignará
   * un id automáticamente.
   * Finalmente se le proporciona un parámetro con los datos del documento (taskData).
   */
  static createDepartmentTask = async (
    departmentId: string,
    taskData: TaskModel
  ) => {
    const kanbanCollectionRef =
      this.getDepartmentKanbanCollectionRef(departmentId);

    // Creamos el documento de la DB
    return await addDoc(kanbanCollectionRef, { ...taskData });
  };
}
