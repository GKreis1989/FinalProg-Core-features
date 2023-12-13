document.addEventListener('DOMContentLoaded', async () => {

    /*
        From Justice Gödel Conder on Stack Overflow
        https://stackoverflow.com/q/25109312/14602843
    */
    var parseQueryString = function( queryString ) {
        var params = {}, queries, temp, i, l;
        queries = queryString.split("&");
        for ( i = 0, l = queries.length; i < l; i++ ) {
            temp = queries[i].split('=');
            params[temp[0]] = temp[1];
        }
        return params;
    };

    const searchObject = parseQueryString(window.location.search.substring(1));
    const userId = searchObject?.userId;
    const individualUser = document.getElementById('individualUser');

    try {
        const response = await fetch(`/user/${userId}`);
        const user = await response.json();

        const listItem = document.createElement('li');
        listItem.textContent = `${user.firstName} ${user.lastName} - ${user.emailAddress}`;
        individualUser.appendChild(listItem);
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
});
