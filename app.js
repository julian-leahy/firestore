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

/**
 * Return a specific document
 * @param {string} field 
 * @param {sting} condition 
 * @param {string} value 
 */
const outputSpecificUser = (field, condition, value) => {
    db.collection('users').where(field, condition, value).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            generateUserList(doc);
        });
    })
}

const generateUserList = (doc => {
    const li = document.createElement('li');
    const name = document.createElement('span');
    const email = document.createElement('span');
    const deleteX = document.createElement('div');
    // add firestore generated id so we can reference if required
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    email.textContent = doc.data().email;
    deleteX.textContent = 'X';


    li.appendChild(name);
    li.appendChild(email);
    li.appendChild(deleteX);

    userList.appendChild(li);

    // delete user
    deleteX.addEventListener('click', (e) => {
        const id = e.target.parentElement.getAttribute('data-id');
        db.collection('users').doc(id).delete();
    })
})


// TEST

//outputUsers();
outputSpecificUser('name', '==', 'user1');



form.addEventListener('submit', (e) => {
    e.preventDefault();
    addDocument('users', {
        name: form.name.value,
        email: form.email.value
    })
})