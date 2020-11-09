/**
 * Return all documents from a collection
 * @param {string} document 
 */
const getAllDocs = (document) => {
    db.collection(document).get().then(snapshot => {
        return snapshot.docs
    })
}





let userDocs = getAllDocs('users');