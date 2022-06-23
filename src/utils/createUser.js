export const createUser = (name,username,phone,email,address) => {
   return fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            username: username,
            phone: phone,
            email: email,
            address: address
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => json);
}