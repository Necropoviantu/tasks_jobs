import {defineStore} from "pinia/dist/pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        current: {}
    }),
    getters: {
        getCurrent: (state) => state.current
    },
    actions: {
        async getUser() {
            const user = await new Promise((resolve)=>{
                BX24.callMethod('user.current', {}, result =>{
                    resolve(result.data())
                });
            })

              this.current ={
                id: user.ID,
                name: user.LAST_NAME +' '+ user.NAME,
                photo: user.PERSONAL_PHOTO
              }
        },
    },
})