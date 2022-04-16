# RUN

1) Bicycle: `$ npm i && USERNAME={{YOUR_GH_USERNAME}} node ghimp.js`
2) Run terminal in folder and
  `$ curl "https://api.github.com/users/$USERNAME/repos?per_page=1000" |
  grep -e 'clone_url*' |
  cut -d \" -f 4 |
  xargs -L1 git clone`

## Only public repositories!
