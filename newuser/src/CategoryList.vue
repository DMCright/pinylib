<template>
    <div>
<!--添加类别按钮-->
        <div style="padding: 10px">
            <el-button icon="el-icon-plus" type="primary"
                       @click="addDialogVisible=true">添加类别
            </el-button>
        </div>
<!--       类别展示表格-->
        <el-table
                :data="tableData"
                style="width: 100%;padding: 0px 0px"
                stripe
                border
        >
            <el-table-column
                    label="类别id"
                    prop="id"
                    width="80px">
            </el-table-column>
            <el-table-column
                    label="类别名"
                    prop="categoryName">
            </el-table-column>
            <el-table-column
                    label="类别描述"
                    prop="categoryDesc">
            </el-table-column>
            <el-table-column
                    label="楼层"
                    prop="floor">
            </el-table-column>
            <el-table-column
                    align="right"
                    width="180px"
            >
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.row)">详情/修改
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
                    :page-sizes="[5,10,15]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
        <!--添加图书类别的对话框-->
        <el-dialog
                title="添加图书类别"
                :visible.sync="addDialogVisible"
                width="50%"
                @close="addDialogClosed"
        >
            <!--内容主题区-->
            <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="90px">
                <el-form-item label="类别名" prop="categoryName">
                    <el-input v-model="addForm.categoryName"></el-input>
                </el-form-item>
                <el-form-item label="类别描述" prop="categoryDesc">
                    <el-input v-model="addForm.categoryDesc"></el-input>
                </el-form-item>
                <el-form-item label="楼层" prop="floor">
                    <el-input v-model="addForm.floor"></el-input>
                </el-form-item>
            </el-form>
            <!--底部区-->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCategory">确 定</el-button>
            </span>
        </el-dialog>

        <!--类别详情的对话框-->
        <el-dialog
                title="类别详情"
                :visible.sync="editDialogVisible"
                width="70%"
                @close="editDialogClosed"
        >
            <!--内容主题区-->
            <el-form ref="editFormRef" :model="editForm"
                     :rules="addFormRules" label-width="90px">
                <el-form-item label="类别名" prop="categoryName">
                    <el-input v-model="editForm.categoryName"></el-input>
                </el-form-item>
                <el-form-item label="类别描述" prop="categoryDesc">
                    <el-input v-model="editForm.categoryDesc"></el-input>
                </el-form-item>
                <el-form-item label="楼层" prop="floor">
                    <el-input v-model="editForm.floor"></el-input>
                </el-form-item>
            </el-form>
            <!--底部区-->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editCategory">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            //验证书籍类别对应楼层的规则
            var checkFloor = (rule,value,cb)=>{//cb为回调函数
                if(value%1!=0){
                    cb(new Error('请输入整数'))
                }
                if(value>=1&&value<=8){
                    return cb()
                }
                cb(new Error('请输入1-8内的楼层'))
            }
            var checkCategoryName= (rule,value,cb)=>{//cb为回调函数
                var str = value;
                var arr = new Array();
                arr = str.split(" ");
                if (arr.length != 1) {
                    cb(new Error('输入包含空格！'))
                }
                if(value.length>10){
                    cb(new Error('类别名不能超过十个字！'))
                }
                return cb();
            }
            return {
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

                },
                //添加表单的验证规则对象
                addFormRules: {
                    floor: [
                        {required: true, message: '请输入书籍楼层', trigger: 'blur'},
                        {
                            validator: checkFloor,
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                    categoryName: [
                        {required: true, message: '请输入类别名', trigger: 'blur'},
                        {
                            validator: checkCategoryName,
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                },
                //控制修改用户对话框的显示与隐藏
                editDialogVisible: false,
                //编辑用户的表单数据
                editForm:{
                    id:0,
                    categoryDesc:'',
                    categoryName:'',
                    floor:1,
                },
            }
        },

        created() {
            this.getCategory();
            // this.$http.get("http://10.10.102.162:8001/user/select/100/1")
            //     .then(res => {
            //         this.tableData = res.data.data.list;
            //         console.log(this.tableData);
            //     })
        },

        methods: {
            getCategory() {
                this.$http.get(this.MYLINK.link2+"/admin/category/select/"
                    + this.queryInfo.pagesize + "/" + this.queryInfo.pagenum)
                    .then(res => {
                        console.log("getCategory类别表查询数据：");
                        console.log(res.data.data);
                        console.log(this.queryInfo.pagesize);
                        console.log(this.queryInfo.pagenum);
                        this.total = res.data.data.total;
                        this.tableData = res.data.data.list;
                    });
            },
            //展示编辑用户对话框
            handleEdit(id) {
                console.log("编辑界面id数据");
                console.log(id);
                // this.editForm = id;
                console.log(this.editForm);
                this.$http.get(
                    this.MYLINK.link2+"/admin/category/get/"+id.id)
                    .then(res => {
                        this.editForm.id = res.data.data.id;
                        this.editForm.categoryDesc = res.data.data.categoryDesc;
                        this.editForm.categoryName = res.data.data.categoryName;
                        this.editForm.floor = res.data.data.floor;
                    });
                this.editDialogVisible = true;
            },
            //根据id删除书籍信息
            handleDelete(id) {
                this.$confirm('此操作将永久删除该书籍的数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$http.delete(
                        this.MYLINK.link2+'/admin/category/delete/' + id)
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            } else {
                                this.$message.error('删除失败')
                            }
                            //刷新类别数据表格
                            this.getCategory()
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                //刷新类别数据表格
                this.getCategory()
            },
            //监听pagesize改变事件
            handleSizeChange(newSize) {
                console.log(newSize);
                this.queryInfo.pagesize = newSize;
                this.getCategory();
            },
            //监听页码值改变事件
            handleCurrentChange(newPage) {
                console.log(newPage)
                this.queryInfo.pagenum = newPage;
                this.getCategory();
            },
            //监听对话框的关闭事件
            addDialogClosed() {
                //为下次打开清空表单
                this.$refs.addFormRef.resetFields();
            },
            //点击确认按钮，添加新类别
            addCategory() {
                this.$refs.addFormRef.validate(async (valid) => {
                    // valid==true 表示通过表单校验
                    console.log(valid);
                    // console.log("###$$$###");
                    // console.log(this.addForm);
                    if(!valid) return;
                    const {data: res} = await this.$http.post(
                        this.MYLINK.link2+'/admin/category/save',
                        this.$qs.stringify(this.addForm));
                    if (res.code !== 200) {
                        this.$message.error(res.message)
                    }
                    console.log(res);
                    this.$message.success(res.message)
                    //隐藏类别对话框
                    this.addDialogVisible = false
                    //重新刷新类别列表数据
                    this.getCategory()
                })
            },
            //监听编辑用户对话框关闭事件
            editDialogClosed() {
                //resetFields()清空对话框的输入框
                this.$refs.editFormRef.resetFields();
            },
            //提交修改后的书籍信息的表单
            editCategory() {
                //validate验证表单
                this.$refs.editFormRef.validate(valid => {
                    //如果验证输入不合法，valid返回false
                    if (!valid) return
                    this.$http.put(
                        this.MYLINK.link2+'/admin/category/update',
                        // stringify()转为字符串
                        this.$qs.stringify(this.editForm)
                        // this.editForm
                    ).then(res => {
                            console.log("提交修改返回状态")
                            console.log(res.status)
                            console.log(res)
                            if (res.data.code == 444) {
                                return this.$message.error(res.data.message)
                            }
                            if (res.status != 200) {
                                return this.$message.error(res.data.message)
                            } else {
                                //提示修改成功
                                this.$message.success(res.data.message)
                            }
                        }
                    )
                    console.log("提交的表单")
                    console.log(this.editForm)
                    console.log("overover")
                    //关闭对话框
                    this.editDialogVisible = false
                    //刷新数据表格
                    this.getCategory()

                })
            }
        },
    }
</script>

<style scoped>
    .el-pagination{
        position: center;
    }
    .block{
        margin-left: 50%;
        transform: translateX(-60%)
    }
</style>