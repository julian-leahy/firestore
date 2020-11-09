const form = document.querySelector('#add-user');
const userList = document.querySelector('.user-list');


/**
 * Return all documents from a collection
 * @param {string} document 
 */
const getAllDocs = (document) => {
    db.collection(document).get().then(snapshot => {
        return snapshot
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

/**
 * get all user documents and append each one to the list
 */
const outputUsers = () => {
    db.collection('users').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            generateUserList(doc);
        });
    })
}

const generateUserList = (doc => {
    const li = document.createElement('li');
    const name = document.createElement('span');
    const email = document.createElement('span');
    // add firestore generated id so we can reference if required
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    email.textContent = doc.data().email;

    li.appendChild(name);
    li.appendChild(email);

    userList.appendChild(li);
})


// TEST

outputUsers();



form.addEventListener('submit', (e) => {
    e.preventDefault();
    addDocument('users', {
        name: form.name.value,
        email: form.email.value
    })
})