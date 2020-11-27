<template>
    <div>
        <el-card class="box-card" style="margin: 10px" shadow="hover">
            <div slot="header" class="clearfix">
                <span>用户管理</span>
                <!--        添加用户按钮-->
                <div style="padding: 0px;float: right;margin-right: 10px;margin-top: -10px">
                    <el-button icon="el-icon-plus"
                               type="primary"
                               @click="addDialogVisible=true">
                        添加用户
                    </el-button>
                </div>
            </div>
            <!--主页用户表格-->
            <el-table
                    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%;padding: 0px 0px"
                    stripe
                    border
            >
                <!--                <el-table-column-->
                <!--                        type="index">-->
                <!--                </el-table-column>-->
                <el-table-column
                        label="注册时间"
                        prop="registerDate"
                        column-key="registerDate">
                </el-table-column>
                <el-table-column
                        label="用户名"
                        prop="username">
                </el-table-column>
                <el-table-column
                        label="联系方式"
                        prop="telephone">
                </el-table-column>
                <el-table-column
                        label="邮箱"
                        prop="email">
                </el-table-column>
                <el-table-column
                        label="身份"
                        prop="status">
                    <template slot-scope="scope">
                        <span style="margin-left:0px">{{ scope.row.status?lable1:lable0 }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="right"
                width="200px">
                    <template slot="header">
                        <!--                    <el-input-->
                        <!--                            v-model="search"-->
                        <!--                            size="mini"-->
                        <!--                            placeholder="输入关键字搜索"/>-->
                    </template>
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.row.id)">查询详情/修改
                        </el-button>
                        <el-button
                                size="mini"
                                type="info"
                                @click="handleDelete(scope.row.id)">删除
                        </el-button>

                    </template>
                </el-table-column>
            </el-table>
            <!--        分页区域-->
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="queryInfo.pagenum"
                        :page-sizes="[2, 5, 10, 15]"
                        :page-size="queryInfo.pagesize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </el-card>
        <!--添加用户的对话框-->
        <el-dialog
                title="添加用户"
                :visible.sync="addDialogVisible"
                width="50%"
                @close="addDialogClosed"
                class="addFormclass"

        >
            <!--内容主题区-->
            <div class="addformdiv">
                <el-form
                        ref="addFormRef"
                        :model="addForm"
                        :rules="addFormRules"
                        label-width="90px">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="addForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="telephone">
                        <el-input v-model="addForm.telephone"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="addForm.password"
                                  show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="newpassword">
                        <el-input
                                type="password"
                                v-model="addForm.newpassword"
                                show-password
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="addForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="身份状态">
                        <el-select v-model="addForm.status"
                                   placeholder="请选择查询条件"
                                   style="width: 200px">
                            <el-option label="普通用户" value=0>普通用户</el-option>
                            <el-option label="管理员" value=1>管理员</el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <!--底部区-->
            <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addUser">确 定</el-button>
                </span>
        </el-dialog>
        <!-- 修改用户的对话框-->
        <el-dialog
                title="查询详情/修改用户"
                :visible.sync="editDialogVisible"
                width="50%"
                @close="editDialogClosed"
        >
            <!--内容主题区-->
            <el-form ref="editFormRef"
                     :model="editForm"
                     :rules="editFormRules"
                     label-width="90px"
                     style="padding: 0px 20px;">
                <el-form-item label="用户名" prop="username"
                              style="width: 300px;float: left">
                    <el-input v-model="editForm.username"
                              :disabled="editable"
                              style="width: 200px;">
                    </el-input>
                </el-form-item>
                <!--                    <el-form-item label="密码" prop="password">-->
                <!--                        <el-input  show-password type="password" v-model="editForm.password"></el-input>-->
                <!--                    </el-form-item>-->
                <el-form-item label="联系方式" prop="telephone"
                              style="width: 300px;float: left">
                    <el-input v-model="editForm.telephone"
                              :disabled="editable"
                              style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email"
                              style="width: 300px;float: left">
                    <el-input v-model="editForm.email"
                              :disabled="editable"
                              style="width: 200px;float: left"></el-input>
                </el-form-item>
                <el-form-item label="身份状态"
                              style="width: 300px;float: left">
                    <el-select v-model="editForm.status"
                               :disabled="editable"
                               style="width: 200px">
                        <el-option label="普通用户" value=0>普通用户</el-option>
                        <el-option label="管理员" value=1>管理员</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户Id" prop="id"
                              style="width: 300px;float: left">
                    <el-input v-model="editForm.id"
                              :disabled="true"
                              style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="注册日期" prop="registerDate"
                              style="width: 300px;float: left">
                    <el-input v-model="editForm.registerDate"
                              :disabled="true"
                              style="width: 200px;float: left"></el-input>
                </el-form-item>
            </el-form>
            <!--底部区-->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <!--编辑按钮-->
                <el-button type="warning" style="margin-right: 0px" @click="showEdit">编辑</el-button>
                <el-button type="primary" @click="editUser">确认修改</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        watch: {
            status(val) {
                console.log(val)
            }
        },
        data() {
            //验证用户名的规则
            var checkUsername = (rule, value, cb) => {//cb为回调函数
                //空格检测
                var str = value;
                var arr = new Array();
                arr = str.split(" ");
                if (arr.length != 1) {
                    cb(new Error('输入包含空格！'))
                } else if (value.length >= 21) {
                    cb(new Error('用户名不能超过20个字符！'))
                }
                return cb();
            }
            //验证手机的规则
            var checkTelephone = (rule, value, cb) => {//cb为回调函数
                var str = value;
                var arr = new Array();
                arr = str.split(" ");
                if (arr.length != 1) {
                    cb(new Error('输入包含空格！'))
                }
                if (isNaN(value)) {
                    cb(new Error('请输入纯数字手机号'))
                } else if (value.length != 11) {
                    cb(new Error('请输入11位手机号'))
                }
                return cb();
            }
            //验证邮箱的规则
            var checkEmail = (rule, value, cb) => {//cb为回调函数
                //验证邮箱的正则表达式
                const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
                if (value.length > 30) {
                    cb(new Error('请输入30字符以内的邮箱'))
                }
                if (regEmail.test(value)) {
                    //合法的邮箱
                    return cb()
                }
                cb(new Error('请输入合法的邮箱'))
            }
            //验证确认密码的规则
            var checknewPassword = (rule, value, cb) => {//cb为回调函数
                if (value != this.addForm.password) {
                    cb(new Error('密码不一致！'))
                } else {
                    return cb()
                }
            }
            //验证密码的规则
            var checkPassword = (rule, value, cb) => {//cb为回调函数
                //验证密码的正则表达式
                const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@!%*?`~&#^()-=_+]+/
                const big = /^(?=.*[A-Z])+/
                const small = /^(?=.*[a-z])+/
                const special = /^(?=.*[$@!%*?&~`#^()_+-=])+/
                var str = value;
                var arr = new Array();
                arr = str.split(" ");
                if (arr.length != 1) {
                    cb(new Error('输入包含空格！'))
                }
                if (!big.test(value)) {
                    cb(new Error('密码需要至少包含一个大写字母'))
                }
                if (!small.test(value)) {
                    cb(new Error('密码需要至少包含一个小写字母'))
                }
                if (!special.test(value)) {
                    cb(new Error('密码需要至少包含一个特殊字符'))
                }
                if (value.length > 30 || value.length <= 7) {
                    cb(new Error('密码需要在8-30位之间'))
                }
                if (regPassword.test(value)) {
                    //合法的密码
                    return cb()
                }
                // cb(new Error('请输入合法的密码'))
            }
            return {
                userstatus:0,
                options: [{
                    value: '0',
                    label: '普通用户'
                }, {
                    value: '1',
                    label: '管理员'
                },],
                tableData: [],
                search: '',
                queryInfo: {
                    query: '',
                    //当前页数
                    pagenum: 1,
                    //每页显示多少数据
                    pagesize: 5
                },
                total: 0,
                //添加用户对话框的显示与隐藏
                addDialogVisible: false,
                //添加用户的表单数据
                addForm: {
                    username: '',
                    password: '',
                    newpassword: '',
                    telephone: '',
                    email: '',
                    status: '普通用户',
                    register_date: '',
                },
                //添加表单的验证规则对象
                addFormRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {
                            validator: checkUsername,
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                    password: [
                        {required: true, message: '请设置密码', trigger: 'blur'},
                        {
                            validator: checkPassword,
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                    newpassword: [
                        {required: true, message: '密码为空', trigger: 'blur'},
                        {
                            validator: checknewPassword,
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                    telephone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {
                            validator: checkTelephone,
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {
                            validator: checkEmail,
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                },
                //编辑表单的验证规则对象
                editFormRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {
                            validator: checkUsername,
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                    password: [
                        {required: true, message: '请设置密码', trigger: 'blur'},
                        {
                            validator: checkPassword,
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                    telephone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {
                            validator: checkTelephone,
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {
                            // min: 1,
                            // max: 30,
                            // message: '30字符长度限制',
                            validator: checkEmail,
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                },
                //控制修改用户对话框的显示与隐藏
                editDialogVisible: false,
                //编辑用户的表单数据
                editForm: {
                    id: 0,
                    username: '',
                    // password: '',
                    telephone: '',
                    email: '',
                    status: 0,
                    registerDate: '',
                },
                lable0: '普通用户',
                lable1: '管理员',
                editable: true,
                newpassword1: '',
            }
        },

        created() {
            this.getUser();
        },

        methods: {
            showEdit() {
                if (this.editable) {
                    this.editable = false;
                } else {
                    this.$message.error("已经可以编辑了哦")
                }
            },
            getUser() {
                // this.$http.get(this.MYLINK.link2+"/admin/user/select/100/1")
                //     .then(res => {
                //         this.total = res.data.data.list.length;
                //     });
                this.$http.get(this.MYLINK.link2 + "/admin/user/select/" + this.queryInfo.pagesize + "/" + this.queryInfo.pagenum)
                    .then(res => {
                        console.log("—————查询用户表返回res.data数据—————");
                        console.log(res.data);
                        this.total = res.data.data.total;
                        this.tableData = res.data.data.list;
                    });
            },
            //展示编辑用户对话框
            handleEdit(id) {
                if(!this.editable) this.editable=true;
                console.log(id);
                this.$http.get(this.MYLINK.link2 + "/admin/user/get/" + id)
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message.success(res.data.message)
                        } else {
                            this.$message.error(res.data.message)
                        }
                        console.log(res.data.data)
                        console.log('______展示编辑框id————————')
                        console.log(id)
                        this.editForm.id = id;
                        this.editForm.username = res.data.data.username;
                        // this.editForm.password = '';
                        this.editForm.telephone = res.data.data.telephone;
                        this.editForm.email = res.data.data.email;
                        this.editForm.status = res.data.data.status;
                        // this.userstatus = res.data.data.status;
                        if(res.data.data.status){
                            this.editForm.status='管理员'
                        }else{
                            this.editForm.status='普通用户'
                        }
                        this.editForm.registerDate = res.data.data.registerDate;

                    });
                this.editDialogVisible = true;
            },
            //根据id删除用户信息
            handleDelete(id) {
                this.$confirm('此操作将永久删除该用户的数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$http.delete(this.MYLINK.link2 + '/admin/user/delete/' + id)
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.getUser();
                            } else {
                                this.$message.error('删除失败')
                            }
                            //刷新用户数据表格
                            this.getUser()
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                // this.getUser();
            },
            //监听pagesize改变事件
            handleSizeChange(newSize) {
                console.log(newSize);
                this.queryInfo.pagesize = newSize;
                this.getUser();
            },
            //监听页码值改变事件
            handleCurrentChange(newPage) {
                console.log(newPage)
                this.queryInfo.pagenum = newPage;
                this.getUser();
            },
            //监听对话框的关闭事件
            addDialogClosed() {
                this.$refs.addFormRef.resetFields();
            },
            //点击确认按钮，添加新用户
            addUser() {
                if(isNaN(this.addForm.status)){
                    this.addForm.status=0
                }
                this.$refs.addFormRef.validate(async (valid) => {
                    console.log(valid);
                    console.log(this.addForm);
                    if (!valid) return
                    const {data: res} = await this.$http.post(
                        this.MYLINK.link2 + '/admin/user/save',
                        this.$qs.stringify(this.addForm));
                    if (res.code !== 200) {
                        this.$message.error(res.message)
                    }
                    console.log(res);
                    this.$message.success(res.message)
                    //隐藏用户对话框
                    this.addDialogVisible = false
                    //重新刷新用户列表数据
                    this.getUser()
                    this.addForm.status='普通用户'
                })
            },
            //监听编辑用户对话框关闭事件
            editDialogClosed() {
                //resetFields()清空对话框的输入框
                this.$refs.editFormRef.resetFields();
            },
            //提交修改后的用户信息 表单
            editUser() {
                //validate验证表单
                this.$refs.editFormRef.validate(valid => {
                    //如果验证输入不合法，valid返回false
                    if (!valid) return
                    console.log("111提交修改的表单：")
                    console.log(this.editForm)
                    if(isNaN(this.editForm.status)){
                         this.editForm.status = this.userstatus
                    }
                    console.log("222提交修改的表单：")
                    console.log(this.editForm)
                    this.$http.put(
                        this.MYLINK.link2 + '/admin/user/update',
                        this.$qs.stringify(this.editForm)
                    ).then(res => {
                            if (res.status != 200) {
                                return this.$message.error(res.data.message)
                            } else {
                                //提示修改成功
                                this.$message.success(res.data.message)
                                this.getUser()
                            }
                        }
                    )
                    //关闭对话框
                    this.editDialogVisible = false
                    //刷新数据表格
                    this.getUser()
                })
            }
        },
    }
</script>

<style scoped>
    body {
        min-width: 800px;
    }

    .el-pagination {
        position: center;
    }

    .block {
        margin-left: 50%;
        transform: translateX(-60%)
    }

    .addFormclass .el-form .el-form-item {
        width: 300px;
        float: left;
    }

    .addFormclass .el-form .el-form-item .el-input {
        width: 200px
    }

    .addformdiv {
        width: 100%;
        height: 160px;
    }
</style>