const fetch = require("node-fetch");

const requestToGithub = async ({ username, limit, ownerAffiliations }) => {
  const query = `
  query {
    user (login: "${username}") {
      avatarUrl
      email
      starredRepositories(first: ${limit}) { 
        totalCount
        nodes {
          databaseId
          name
          url
          languages (first: 20){
            nodes {
              name
            }
          }
        }
      }
      repositories (first: ${limit}, ownerAffiliations: [${ownerAffiliations}]) { 
        totalCount
        nodes {
          databaseId
          name
          url
          languages (first: 20){
            nodes {
              name
            }
          }
        }
      }
    }
  }`;

  const result = await fetch(process.env.API_URL, {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  });
  const data = await result.json();
  return data;
};

const repositoriesIndex = async (req, res) => {
  const repositoriesInfo = await requestToGithub({
    ...req.params,
    ...req.query,
  });
  res.status(200).send(repositoriesInfo);
};

exports.repositoriesIndex = repositoriesIndex;
