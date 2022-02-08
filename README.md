## Project Structure
```
├── config: development related configuration
├── public: static resources required for packaging
└── src
    ├── api: AJAX request
    └── assets: project static resources
        ├── icons: custom icon resources
        └── images: Image resources
    ├── components: business components
    ├── config: project run configuration
    ├── directive: custom directive
    ├── libs: encapsulates utility functions
    ├── locale: multilingual files
    ├── mock: mock mock data
    ├── router: routing configuration
    ├── store: Vuex configuration
    ├── view: page file
    └── tests: test related
```

## Getting started
```bush
// install dependencies
npm install

// develop
npm run dev
```

## Local API
```bush
cd C:\Program Files (x86)\Google\Chrome\Application
chrome.exe --disable-web-security --user-data-dir=c:\my\data
```

## Deploy(Testing)
```bush
npm run build
firebase login
firebase init
firebase deploy

URL Website: [https://ivan-vue.web.app](https://ivan-vue.web.app)
```