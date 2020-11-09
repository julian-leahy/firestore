const form = document.querySelector('#add-user');


/**
 * Return all documents from a collection
 * @param {string} document 
 */
const getAllDocs = (document) => {
    db.collection(document).get().then(snapshot => {
        return snapshot.docs
    })
}

/**
 * Add a new document to a collection
 * @param {string} document 
 * @param {object} obj 
 */
const addDocument = (document, obj) => {
    db.collection(document).add(obj);
}


// TEST

let userDocs = getAllDocs('users');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addDocument('users', {
        name: form.name.value,
        email: form.email.value
    })
})