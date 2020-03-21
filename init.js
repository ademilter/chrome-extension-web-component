const state = {
  loaded: {},
  injected: {}
}

const App = ({ id: tab_id }) => {
  if (state.loaded[tab_id] && state.injected[tab_id]) {
    chrome.tabs.executeScript(tab_id, { file: 'helper/eject.js' })
    state.injected[tab_id] = false
  } else if (state.loaded[tab_id] && !state.injected[tab_id]) {
    chrome.tabs.executeScript(tab_id, { file: 'helper/inject.js' })
    state.injected[tab_id] = true
  } else {
    chrome.tabs.executeScript(tab_id, { file: 'lib/webcomponents-bundle.js' })
    chrome.tabs.executeScript(tab_id, { file: 'app.js' })
    chrome.tabs.executeScript(tab_id, { file: 'helper/inject.js' })

    state.loaded[tab_id] = true
    state.injected[tab_id] = true
  }
}

chrome.browserAction.onClicked.addListener(App)
