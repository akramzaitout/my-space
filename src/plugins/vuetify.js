import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
          primary : '#41adf1',
          secondary: colors.amber.lighten2,
          divColor : colors.brown.lighten5,
          helperColor: colors.green.accent2,
          accent: colors.shades.black,
          error: colors.red.accent3,
        },
        dark: {
          primary: colors.deepPurple.darken2,
          secondary : colors.red.accent2,
          divColor : colors.grey.darken4,
          helperColor: colors.lightBlue.lighten2,
        },
      }
    },
});

/*
        light: {
          //primary: colors.lightBlue.darken2,
          primary : '#41adf1',
          secondary: colors.amber.lighten2,
          divColor : colors.brown.lighten5,
          helperColor: colors.green.accent2,
          accent: colors.shades.black,
          error: colors.red.accent3,
        },
        dark: {
          //primary: colors.deepPurple.darken2,
          primary: '#392d40',
          secondary : colors.red.accent2,
          divColor : colors.grey.darken4,
          helperColor: '#5a9db4',
        },
*/


/*
        light: {
          primary: colors.lightBlue.darken2,
          secondary: colors.amber.lighten2,
          divColor : colors.brown.lighten5,
          helperColor: colors.green.accent2,
          accent: colors.shades.black,
          error: colors.red.accent3,
        },
        dark: {
          primary: colors.deepPurple.darken2,
          secondary : colors.red.accent2,
          divColor : colors.grey.darken4,
          helperColor: colors.lightBlue.lighten2,
        },
*/