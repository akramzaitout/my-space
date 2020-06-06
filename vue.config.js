module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    name: 'My Space',
    themeColor: '#41adf1',
    msTileColor: '#101010',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      navigateFallback: 'index.html'
    }
  }
}

