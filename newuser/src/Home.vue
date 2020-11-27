<template>
    <el-container style="padding: 0">
        <el-header height="50px">
            <div>
                <img src="../src/assets/LibIcon.png" alt="">
                <span>图书馆后台管理系统</span>
            </div>
            <div>
                <el-button type="info" @click="gotofron">返回</el-button>
            </div>
        </el-header>
        <el-container>
            <el-aside width="150px">
                <!--侧边菜单-->
                <el-menu
                        background-color="#138fbc"
                        router
                        active-text-color="#f9ff9c"
                >
                    <el-menu-item index="/UserList">
                        <template slot="title">
                            <!--<span>用户管理</span>-->
<!--                            <i class="el-icon-user-solid"></i>-->
<!--                            <i>用户管理</i>-->
                            <i class="el-icon-user-solid"></i>
                            <i>用户管理</i>
                        </template>
                    </el-menu-item>
<!--                    借阅管理子菜单-->
                    <el-submenu>
                        <template slot="title">
                            <i class="el-icon-document-copy"></i>
                            <i >借阅管理</i>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/BorrowList">
                                <template slot="title">
                                    <i class="el-icon-document-copy"></i>
                                    <i >总借阅列表</i>
                                </template>
                            </el-menu-item>
                            <el-menu-item index="/lendBook">
                                <template slot="title">
                                    <i class="el-icon-data-line"></i>
                                    <i>借书功能</i>
                                </template>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
<!--                    <el-menu-item index="/BorrowList">-->
<!--                        <template slot="title">-->
<!--                            <i class="el-icon-document-copy"></i>-->
<!--                            <i >借阅管理</i>-->
<!--                        </template>-->
<!--                    </el-menu-item>-->
                    <el-menu-item index="/BookList">
                        <template slot="title">
                            <i class="el-icon-collection"></i>
                            <i>书籍管理</i>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/CategoryList">
                        <template slot="title">
                            <i class="el-icon-paperclip"></i>
                            <i>图书类别管理</i>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/NoticeManager">
                        <template slot="title">
                            <i class="el-icon-bell"></i>
                            <i>公告栏管理</i>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/addManage">
                        <template slot="title">
                            <i class="el-icon-data-line"></i>
                            <i>统计管理</i>
                        </template>
                    </el-menu-item>
<!--                    <el-menu-item index="/lendBook">-->
<!--                        <template slot="title">-->
<!--                            <i class="el-icon-data-line"></i>-->
<!--                            <i>借书功能</i>-->
<!--                        </template>-->
<!--                    </el-menu-item>-->
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Home",
        methods: {
            gotofron() {
                window.location.href = 'http://100.2.226.87:8081'
            }
        }
    }
</script>

<style scoped>
    /*body{*/
    /*    min-width: 1000px;*/
    /*}*/
    .el-menu {
        /*overflow: hidden;*/
    }

    .el-header {
        padding-left: 10px;
        background-color: #a7d8ec;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
    }

    .el-header div {
        display: flex;
        align-items: center;
    }

    .el-header div span {
        margin-left: 10px;
        font-size: 20px;
        font-weight: 700;
        color: #f9ff9c;
    }

    .el-header img {
        height: 50px;
        width: auto;
    }

    .el-header .el-button {
        height: 38px;
        width: 90px;
        font-size: 10px;
        text-align: center;
        background-color: #138fbc;
        border: 0px;
    }

    .el-menu-item {
        height: 50px;
    }

    .el-menu-item span {
        font-size: 5px;
        /*color: #f9ff9c;*/
        color: #fff;
    }
    .el-menu-item i {
        font-size: 16px;
        font-weight: 500;
        /*color: #f9ff9c;*/
        color: #fff;
        font-style: normal;
    }
    .el-submenu i {
        font-size: 16px;
        font-weight: 500;
        /*color: #f9ff9c;*/
        color: #fff;
        font-style: normal;
    }
    .el-submenu {
        padding-left: 0px !important;
    }
    .el-menu-item-group .el-menu-item{
        background-color: #0f7296 !important;
        padding-left: 20px !important;
    }
    .el-menu-item-group .el-menu-item i{
        font-size: 15px;
        font-weight: 500;
    }
    .el-menu-item-group{
        /*background-color: #a7d8ec !important;*/
        padding-top: 0px !important;
    }
    .el-main {
        padding: 0;
    }

    .el-aside {
        background-color: #138fbc;
        height: 580px;
        overflow: hidden;
    }
    .el-aside .el-menu{
        border-right: 0px;
    }
    .el-aside .el-menu+.el-menu-item{
        border-right: none;
        padding-left: 9px !important;
    }
    .el-container {
        /*background-color: antiquewhite;*/
    }

    .home-container {
        height: 500px;
    }
</style>