import fetch from "node-fetch";
import shell from "shelljs";

const FOLDER_NAME = "PUBLIC_PROJECTS"
let PROGRESS_COUNT = 0

shell.mkdir(FOLDER_NAME)
shell.cd(`./${FOLDER_NAME}`)

const cloneRepo = (repo, _, array) => shell.exec(`git clone ${repo.html_url}`, () => {
  PROGRESS_COUNT++
  console.log('\x1b[32m', `REPO "${repo.name}" DOWNLOADED (PROGRESS: ${PROGRESS_COUNT}/${array.length})`);
})

const saveReposOnLocal = async () => {
  const response = await fetch(`https://api.github.com/users/${process.env.USERNAME}/repos?per_page=1000`);
  if (response.ok) {
    const repos = await response.json();
    repos.forEach(cloneRepo)
  } else {
    console.log('\x1b[31m', "Error HTTP: " + response.status);
  }
}

saveReposOnLocal()