import { createApp } from 'vue'
import Router from './router';
import App from './App.vue'
import './style.css'
import 'vant/lib/index.css'
import 'spectre.css'
import 'spectre.css/dist/spectre.css'
import 'spectre.css/dist/spectre-exp.css'
import 'spectre.css/dist/spectre-icons.css'

// vant
import { FloatingBubble, Grid, GridItem, NavBar, Image as VanImage, Cell, CellGroup, Picker, List, Field } from 'vant'

const webApp = createApp(App);
webApp.use(Router);
webApp.use(FloatingBubble);
webApp.use(Grid);
webApp.use(GridItem);
webApp.use(NavBar);
webApp.use(VanImage);
webApp.use(Cell);
webApp.use(CellGroup);
webApp.use(Picker);
webApp.use(List);
webApp.use(Field);
webApp.mount('#app')

