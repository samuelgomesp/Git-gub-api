const users = [];
async function fetchUser(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const user = await response.json();
    if (user.message) {
        console.log('Usuário não encontrado');
    }
    else {
        users.push(user);
        console.log(`O usuário ${user.login} foi salvo.\n` +
            `\nid: ${user.id}` +
            `\nlogin: ${user.login}` +
            `\nNome: ${user.name}` +
            `\nBio: ${user.bio}` +
            `\nRepositórios públicos: ${user.public_repos}`);
    }
}
function showUsers() {
    let usersList = 'Usuários Registrados:\n';
    let count = 0;
    users.forEach((user) => {
        usersList += `
      Usuário: ${user.login}
        Id: ${user.id}
        Login: ${user.login}
        Name: ${user.name}
        Bio: ${user.bio}
        Repositórios Públicos: ${user.public_repos}
      `;
    });
    console.log(usersList);
}
function findUser(username) {
    const user = users.find(userObj => userObj.login === username);
    return user ?? false;
}
async function showReposUser(username) {
    const user = findUser(username);
    if (user) {
        const reposData = await fetch(user.repos_url);
        const repos = await reposData.json();
        console.log(`Estes são alguns repositórios do usuário ${username}\n` +
            `\nid: ${user.id}` +
            `\nlogin: ${user.login}` +
            `\nNome: ${user.name}` +
            `\nBio: ${user.bio}` +
            `\nRepositórios públicos: ${user.public_repos}`);
        for (let i = 0; i <= 1; i++) {
            console.log(`\nRepositório ${i + 1}` +
                `\n- Nome: ${repos[i].name}` +
                `\n- Descrição: ${repos[i].description}` +
                `\n- Possui forks? ${repos[i].fork === true ? 'Sim' : 'Não'}` +
                `\n- Número de Estrelas: ${repos[i].stargazers_count}`);
        }
    }
    else {
        console.log('Usuário não encontrado');
    }
}
function showTotalRepos() {
    if (!Array.isArray(users) || users.length === 0) {
        console.log('Nenhum usuário cadastrado.');
        return;
    }
    const totalRepos = users.reduce((acc, currentValue) => {
        return acc + currentValue.public_repos;
    }, 0);
    console.log(`O total de repositórios de todos os usuários cadastrados é de: ${totalRepos}`);
    return totalRepos;
}
function showTopFiveUsers() {
    const filteredUsers = users.filter((obj => obj.public_repos !== 0));
    const sortedUsers = filteredUsers.sort((a, b) => b.public_repos - a.public_repos).slice(0, 5);
    let consoleTopUsers = `Top 5 Usuários com mais repositórios públicos:\n`;
    let count = 0;
    sortedUsers.forEach((user) => {
        count += 1;
        consoleTopUsers += `\nTop: ${count}` +
            `\nNome: ${user.name}` +
            `\nQuantidade de repositórios: ${user.public_repos}\n`;
    });
    console.log(consoleTopUsers);
    return sortedUsers;
}
