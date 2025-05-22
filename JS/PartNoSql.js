        import { FirestoreService } from './Modules/NoSQL/firestore_service.js';



        const firestore = new FirestoreService("estudiantes");


        document.getElementById("loadDataBtn").addEventListener("click", async () => {
            const docs = await firestore.getAllDocuments();
            const docwithId = await firestore.getDocumentById("001"); 
            console.log("Obtained Docs:", docs);
            console.log("Obtained Doc with ID:", docwithId);
            docs.forEach(doc => {
                console.log("Document ID:", doc.id);
            });
        })

        document.getElementById("addDocBtn").addEventListener("click", async () => {
            const id = document.getElementById("id").value.trim();
            const name = document.getElementById("name").value.trim();
            const carrera = document.getElementById("carrera").value.trim();
            const edadValue = document.getElementById("edad").value;
            const edad = edadValue ? parseInt(edadValue) : null;

           if (!id || !name || !carrera) {
                alert("Fill in the required fields: Document ID, First Name and Last Name.");
                return;
            }

            const data = {
                carrera,
                edad: isNaN(edad) ? null : edad ,
                id,                    
                name,
            };


            await firestore.PostDocument(id, data);
        });

        document.getElementById("getDocBtn").addEventListener("click", async () => {
            const id = document.getElementById("getid").value.trim();

            if (!id) {
                alert("The student id is needed");
                return;
            }
            
            
            const doc = await firestore.getDocumentById(id);

            console.log("name"+doc.name);
            console.log(doc);
        });