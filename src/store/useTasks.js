import {defineStore} from "pinia/dist/pinia";
import moment from 'moment'
export const useTasksStore = defineStore('tasks',{
    state: () => ({
        tasks: [],
        complite:[],
        elapsedTime:[],
        taskUrgent:[
            {id:964,color:'red'},
            {id:965,color:'green'},
            {id:966,color:'blue'},
        ]
    }),
    getters:{
      tasksEvalation: function (state){
          let result = []

          state.tasks.forEach(item =>{
                if(!item.ufAuto534114283231) {

                    result.push(item)
                }
          })
          result.forEach(item=>{
                item.hasComment = 0
                if(item.comment.length > 0) {
                    if (item.comment[0].AUTHOR_ID != item.responsibleId) {
                        item.hasComment = 1
                    }
                }else {
                    item.hasComment=0
                }
          })





          return result
        },
      tasksWaiting: function (state){
            let result =[]
          state.tasks.forEach(item =>{
                if(item.status == 6 && item.ufAuto492553507347 == 1 ) {

                    result.push(item)
                }
            })
            return result
        },
      tasksAtWork: function (state){
          let now = moment();
          let monday = now.clone().weekday(1);
          let friday = now.clone().weekday(5);
          var a = moment();

          let result =[]
          state.tasks.forEach(item=>{
                let deadline = moment(item.deadline)
              if(item.status < 4 && item.ufAuto492553507347 == 1) {
                  if (deadline.isBetween(monday, friday, null, '[]')) {
                      result.push(item)
                  }
                  var b = moment(item.deadline);
                  if (a.diff(b, 'days') > 0) {
                      result.push(item)
                  }
              }
          })

        return  result.sort((a, b) =>  moment(a.deadline)- moment(b.deadline) )

      },
      tasksPlaned: function (state){
          let now = moment();
          let friday = now.clone().weekday(5);
          let result =[]
          state.tasks.forEach(item=> {
              let deadline = moment(item.deadline)
              if(item.status < 4 && item.ufAuto492553507347 == 1) {
                  if (deadline.isAfter(friday, null, '[]')) {
                      result.push(item)
                  }
              }
          })


        return result.sort((a, b) =>  moment(a.deadline)- moment(b.deadline) )

      },
      tasksComplite: function (state){
          let result = []
          state.complite.forEach(item=>{
              result.push(item)
          })
          return result
      },
      tasksElapsed: function (state){
          let result  =[]
          state.elapsedTime.forEach(item =>{

              result.push(item)
          })
          return result
      },
        getTaskUrgent: function (state){
            let result  =[]
            state.taskUrgent.forEach(item =>{

                result.push(item)
            })
            return result
        }
    },
    actions:{
        async loadTasks(id){
           const loading = await new Promise((resolve)=>{
               BX24.complexBatch({
                   tasks: ['tasks.task.list',{filter:{'RESPONSIBLE_ID':id,'!STATUS':5},select:['*','UF_*'] }]
               },result=>{
                  let answer = null;
                   let res = [];
                   for (let i = 0; (answer = result["tasks_" + i]); i++) {
                       answer = answer.data().tasks;
                       answer.forEach((item) => {
                           res.push(item);
                       });
                   }
                   resolve(res)
                   })
           })

            for(let i=0; loading.length > i;i++){
                    loading[i].comment=[]
                const comment = await new Promise((resolve)=>{
                    BX24.callMethod(
                        'task.commentitem.getlist',
                        [loading[i].id, {'POST_DATE': 'desc'}, {}],
                        result=>{
                            resolve(result.data());
                        }
                    );
                })
                loading[i].comment = comment
            }
                let parentID = []
                    for(let i=0; loading.length > i; i++) {
                        if (loading[i].groupId == 0){
                            parentID.push(loading[i].parentId)
                        }
                    }
            const parent = await new Promise((resolve)=>{

                BX24.complexBatch({
                    tasks: ['tasks.task.list',{filter:{'ID':parentID,},select:['*','UF_*'] }]


                },result=>{

                    let answer = null;
                    let res = [];

                    for (let i = 0; (answer = result["tasks_" + i]); i++) {
                        answer = answer.data().tasks;

                        answer.forEach((item) => {
                            res.push(item);
                        });
                    }


                    resolve(res)
                })

            })
                for(let i = 0; loading.length > i; i++){
                        for(let p =0; parent.length > p; p++){
                            if(loading[i].parentId == parent[p].id){
                                loading[i].group = parent[p].group
                            }
                        }
                }
            this.tasks = loading
        },
        async loadTasksComplite(id){
            let today = moment()
            let startDate = moment(today).startOf('month');
            let endDate = moment(today).endOf('month');
            const loading = await new Promise((resolve)=>{
                BX24.complexBatch({
                    tasks: ['tasks.task.list',{filter:{
                        'RESPONSIBLE_ID':id,
                            'STATUS':5,
                            '>=CLOSED_DATE': startDate.format('YYYY-MM-DDTHH:mm:ss'),
                            '<=CLOSED_DATE': endDate.format('YYYY-MM-DDTHH:mm:ss'),
                        },select:['*','UF_*'] }]
                },result =>{
                    let answer = null;
                    let res = [];
                    for (let i = 0; (answer = result["tasks_" + i]); i++) {
                        answer = answer.data().tasks;
                        answer.forEach((item) => {
                            res.push(item);
                        });
                    }
                    resolve(res)
                })
            })


            let parentID = []
            for(let i=0; loading.length > i; i++) {
                if (loading[i].groupId == 0){
                    parentID.push(loading[i].parentId)
                }
            }
            const parent = await new Promise((resolve)=>{

                BX24.complexBatch({
                    tasks: ['tasks.task.list',{filter:{'ID':parentID,},select:['*','UF_*'] }]


                },result=>{

                    let answer = null;
                    let res = [];

                    for (let i = 0; (answer = result["tasks_" + i]); i++) {
                        answer = answer.data().tasks;

                        answer.forEach((item) => {
                            res.push(item);
                        });
                    }


                    resolve(res)
                })

            })
            for(let i = 0; loading.length > i; i++){
                for(let p =0; parent.length > p; p++){
                    if(loading[i].parentId == parent[p].id){
                        loading[i].group = parent[p].group
                    }
                }
            }

            this.complite = loading
        },
        async loadTaskElapsedItem(id){
            let today = moment()
            let startDate = moment(today).startOf('month');
            let endDate = moment(today).endOf('month');

            const elapsed = await  new Promise((resolve)=>{
                BX24.callMethod("task.elapseditem.mygetlist",

                    {
                        "userId":id,
                        "dateStart": startDate.format('DD.MM.YYYY HH:mm:ss'),
                        "dateStop": endDate.format('DD.MM.YYYY HH:mm:ss')
                    }, result => {
                    resolve(result.data())
                });
            })
           this.elapsedTime = elapsed


        }

    }



})