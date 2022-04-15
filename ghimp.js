import fetch from "node-fetch";
import shell from "shelljs";
const FOLDER_NAME = "PUBLIC_PROJECTS"
let PROGRESS_COUNT = 0
shell.mkdir(FOLDER_NAME)
shell.cd(`./${FOLDER_NAME}`)

const getRepo = async (repo, _index, array) => {
  try {
    shell.exec(`git clone ${repo.html_url}`, () => {
      PROGRESS_COUNT++
      console.log('\x1b[32m%s\x1b[0m', `PROJECT ${repo.name} IS DOWNLOADED (PROGRESS: ${PROGRESS_COUNT}/${array.length})`);
    })
  } catch (error) {
    console.log("error by repo", error)
  }
}

const saveReposOnLocal = async () => {
  let response = await fetch(`https://api.github.com/users/${process.env.USERNAME}/repos?per_page=500`);

  if (response.ok) {
    let repos = await response.json();
    Promise.all(repos.map(getRepo))
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
}

saveReposOnLocal()