import { db } from '../../Modules/NoSQL/firebase_init.js';


export class FirestoreService {
  constructor(collectionName) {
    this.collectionRef = db.collection(collectionName);
  }

  async getAllDocuments() {
    const snapshot = await this.collectionRef.get();
    const data = [];
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  }

  async getDocumentById(id) {
    const docRef = this.collectionRef.doc(id);
    const snapshot = await docRef.get();

    if (snapshot.exists) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      return null;
    }
  }

  async postDocument(customId, dataObject) {
    try {
      const docRef = this.collectionRef.doc(customId.toString());
      await docRef.set(dataObject);
      console.log("Documento creado con ID:", customId);
    } catch (e) {
      console.error("Error al crear el documento:", e);
    }
  }
}
