import { db } from '../../Modules/NoSQL/firebase_init.js';

export class FirestoreQuery {
  constructor(collectionName) {
    this.collectionRef = db.collection(collectionName);
  }

  async whereQuery(column, comparison, value) {
    const snapshot = await this.collectionRef.where(column, comparison, value).get();
    return this.formatSnapshot(snapshot);
  }

  async orderedQuery(column, direction = 'asc') {
    const snapshot = await this.collectionRef.orderBy(column, direction).get();
    return this.formatSnapshot(snapshot);
  }

  async limitedQuery(maxResults = 5) {
    const snapshot = await this.collectionRef.limit(maxResults).get();
    return this.formatSnapshot(snapshot);
  }

  async combinedQuery(filters = [], order = null, maxResults = null) {
    let ref = this.collectionRef;

    filters.forEach(f => {
      ref = ref.where(f.column, f.comparison, f.value);
    });

    if (order) {
      ref = ref.orderBy(order.column, order.direction || 'asc');
    }

    if (maxResults) {
      ref = ref.limit(maxResults);
    }

    const snapshot = await ref.get();
    return this.formatSnapshot(snapshot);
  }

  async prefixSearch(column, prefix) {
    const endText = prefix + '\uf8ff';
    const snapshot = await this.collectionRef
      .orderBy(column)
      .startAt(prefix)
      .endAt(endText)
      .get();

    return this.formatSnapshot(snapshot);
  }

  formatSnapshot(snapshot) {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return [];
    }

    const results = [];
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      results.push({ id: doc.id, ...doc.data() });
    });
    return results;
  }
}
