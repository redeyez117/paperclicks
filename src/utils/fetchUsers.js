export const fetchUsers = () => {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => {
            return json
        })
}