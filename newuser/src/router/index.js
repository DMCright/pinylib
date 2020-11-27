import Vue from 'vue';
import VueRouter from "vue-router";
// import {Container} from "element-ui";
// import UserList from "../UserList";
// import UserNews from "../UserNews";
// import BackHome from "../App";
//安装路由
Vue.use(VueRouter);

//配置导出路由
export default new VueRouter({
    routes: [
        {
            path: '/Home',
            component: () => import('../Home'),
            // children: [
            //     {
            //         path: 'UserList',
            //         component: () => import('../UserList')
            //     }
            // ]
        },
        {
          path:'/',
            redirect:'/UserList',
            component:()=>import('../UserList')
        },
        {
          path:'/lendBook',component:()=>import('../lendBook')
        },
        {
          path:'/UserList',component:()=>import('../UserList')
        },
        {
          path:'/BookList',component:()=>import('../BookList')
        },
        {
          path:'/BorrowList',component:()=>import('../BorrowList')
        },
        {
          path:'/addManage',component:()=>import('../addManage')
        },
        {
          path:'/NoticeManager',component:()=>import('../NoticeManager')
        },
        {
          path:'/CategoryList',component:()=>import('../CategoryList')
        },
        {
          path:'/test',component:()=>import('../test')
        }
        // {
        //     path: '/Home',
        //     component: ()=>import('../Home'),
        //     // children:[
        //     //     {
        //     //         path:'UserList',
        //     //         component: ()=>import('../UserList')
        //     //     }
        //     // ]
        // },

        // {
        //     path:'/Home',
        //     component:()=>import('../Home'),
        //      // redirect:'/UserList',
        //     children:[{path:'/UserList',component:UserList}]
        // },
        // {
        //   path:'/',component:()=>import('../Home')
        // }
        // {path:'/UserNews',component:UserNews},
        // {path:'/BackHome',component:BackHome},
    ]
})
