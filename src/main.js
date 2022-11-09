import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import { createPinia } from 'pinia'
const pinia = createPinia()



import BX24 from '/BX24/bitrix24-rest'
if(BX24 && typeof BX24.initAuth == "function") BX24.initAuth({
    client_id: "local.635f5987c17267.41997902",
    client_secret:"9Ow13LQBBe4EFpB6LYs1YN78Vz84aAafqYId6QIdVoCIProYTn",
    access_token:"7d6d5f63005ec6e0003e8582000003120000073af4837e43c7891c6791b0616bc95e98",
    domain:"crm.mywebstor.com",
    expires_in:1667198334201,
    member_id:"5f7e43d175a5eb7df1558ddb4bf75221",
    refresh_token:"6dec8663005ec6e0003e8582000003120000073321d7bbf1cb591cb93169f80f35bff5",
    lang: "ru",
    placement: "DEFAULT",
    // placement_options: {id:10}
 });
import '/BX24/bitrix24-complexBatch'




BX24.init(async ()=>{
createApp(App).use(Quasar, quasarUserOptions).use(pinia).mount('#app')
})