<template>
    <div>
        <!--        添加书籍按钮-->
        <div style="padding: 10px">
            <el-button icon="el-icon-plus" type="primary" @click="addDialogVisible=true">添加书籍</el-button>
        </div>
        <!--        书籍展示表格-->
        <el-table
                :data="tableData"
                style="width: 100%;padding: 0px 0px"
                stripe
                border
        >
            <el-table-column
                    label="封面"
                    prop="cover"
                    width="100px"
            >
                <template slot-scope="scope">
                    <div style="height: 100px;">
                        <img :src="scope.row.cover" style="width: 100%;height: 100%;object-fit:cover;" alt="暂无封面">
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="图书编号"
                    prop="cardId"
            >
            </el-table-column>
            <el-table-column
                    label="书名"
                    prop="bookName">
            </el-table-column>
            <el-table-column
                    label="类别"
                    prop="category.categoryName">
            </el-table-column>
            <el-table-column
                    label="作者"
                    prop="author">
            </el-table-column>
            <el-table-column
                    label="出版社"
                    prop="press">
            </el-table-column>
            <el-table-column
                    label="所在书架"
                    prop="bookShelf">
            </el-table-column>
            <el-table-column
                    label="第几层"
                    prop="bookFloor">
            </el-table-column>
            <el-table-column
                    label="剩余数量"
                    prop="count">
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
        <!--添加书籍的对话框-->
        <el-dialog
                title="添加书籍"
                :visible.sync="addDialogVisible"
                width="50%"
                @close="addDialogClosed"
                class="addFormclass"
                top="30px"
        >
            <!--内容主题区-->

            <div class="addformdiv">
                <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="90px">

                    <el-form-item label="书籍封面" prop="cardId1">
                        <!--上传图片模块-->
                        <el-upload
                                :on-success="fileuploadSuccess"
                                :limit="1"
                                name="filename"
                                action="http://100.2.226.87:18001/file/upload"
                                list-type="picture-card"
                                :auto-upload="true">
                            <i slot="default" class="el-icon-plus"></i>
                            <div slot="file" slot-scope="{file}" >
                                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                                <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                            <i class="el-icon-zoom-in"></i>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                            <i class="el-icon-download"></i>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                            <i class="el-icon-delete"></i>
                        </span>
                    </span>
                            </div>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="书名" prop="bookName">
                        <el-input v-model="addForm.bookName"></el-input>
                    </el-form-item>

                    <el-form-item label="作者" prop="email">
                        <el-input v-model="addForm.author"></el-input>
                    </el-form-item>
                    <!--类别下拉菜单-->
                    <el-form-item label="书籍类别" >
                        <el-select v-model="value" filterable placeholder="请选择" style="width: 200px">
                            <el-option
                                    v-for="item in categoryData"
                                    :key="item.id"
                                    :label="item.categoryName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="ISBN编号" prop="cardId">
                        <el-input v-model="addForm.cardId"></el-input>
                    </el-form-item>
                    <!--                <el-form-item label="类别" prop="telephone">-->
                    <!--                    <el-input v-model="addForm.cid"></el-input>-->
                    <!--                </el-form-item>-->

                    <el-form-item label="出版社" prop="press">
                        <el-input
                                v-model="addForm.press"></el-input>
                    </el-form-item>
                    <el-form-item label="书籍描述" prop="bookDesc" style="width: 300px">
                        <el-input
                                type="textarea"
                                :rows="4"
                                v-model="addForm.bookDesc"
                                style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="书籍价格" prop="price">
                        <el-input v-model="addForm.price"></el-input>
                    </el-form-item>
                    <el-form-item label="书籍数量" prop="count">
                        <el-input v-model="addForm.count"></el-input>
                    </el-form-item>
                    <el-form-item label="所在书架" prop="bookShelf">
                        <el-input v-model="addForm.bookShelf"></el-input>
                    </el-form-item>
                    <el-form-item label="书架层号" prop="bookFloor">
                        <el-input v-model="addForm.bookFloor"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <!--底部区-->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addBook">确 定</el-button>
            </span>
        </el-dialog>

        <!--编辑书籍详情的对话框-->
        <el-dialog
                title="书籍详情"
                :visible.sync="editDialogVisible"
                width="70%"
                @close="editDialogClosed"
                class="editFormclass"
        >
            <!--内容主题区-->


            <div class="formdiv">
                <el-form ref="editFormRef" :model="editForm" :rules="addFormRules" label-width="90px">

                    <el-form-item label="书籍封面：" prop="category1">
                        <!--上传图片模块-->
                        <el-upload
                                :disabled="editable"
                                :on-success="editfileuploadSuccess"
                                :limit="1"
                                name="filename"
                                action="http://100.2.226.87:18001/file/upload"
                                list-type="picture-card"
                                :auto-upload="true">
                            <i slot="default" class="el-icon-plus"></i>
                            <div slot="file" slot-scope="{file}">
                                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                                <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                            <i class="el-icon-zoom-in"></i>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                            <i class="el-icon-download"></i>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                            <i class="el-icon-delete"></i>
                        </span>
                    </span>
                            </div>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>

                    <el-form-item label="书籍类别：" prop="category1">
                        <!--类别下拉菜单-->
                        <el-select v-model="value"
                                   filterable placeholder="请选择"
                                   :disabled="editable"
                        style="width: 200px">
                            <el-option
                                    v-for="item in categoryData"
                                    :key="item.id"
                                    :label="item.categoryName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="ISBN编号" prop="cardId">
                        <el-input v-model="editForm.cardId"
                                  :disabled="editable"></el-input>
                    </el-form-item>
                    <el-form-item label="书名" prop="bookName">
                        <el-input v-model="editForm.bookName"
                                  :disabled="editable"></el-input>
                    </el-form-item>
                    <el-form-item label="作者" prop="author">
                        <el-input v-model="editForm.author"
                                  :disabled="editable"></el-input>
                    </el-form-item>
                    <el-form-item label="出版社" prop="editForm.press">
                        <el-input v-model="editForm.press"
                                  :disabled="editable"></el-input>
                    </el-form-item>
                    <el-form-item label="书的价格" prop="price">
                        <el-input v-model="editForm.price"
                                  :disabled="editable"></el-input>
                    </el-form-item>
                    <el-form-item label="书籍描述" prop="bookDesc"
                                  style="width: 300px">
                        <el-input
                                type="textarea"
                                :rows="4"
                                v-model="editForm.bookDesc"
                                style="width: 200px"
                                :disabled="editable"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="剩余数量" prop="count">
                        <el-input v-model="editForm.count"
                                  :disabled="editable"></el-input>
                    </el-form-item>
                    <el-form-item label="所在书架" prop="bookShelf">
                        <el-input v-model="editForm.bookShelf"
                                  :disabled="editable"></el-input>
                    </el-form-item>
                    <el-form-item label="书架哪层" prop="bookFloor">
                        <el-input v-model="editForm.bookFloor"
                                  :disabled="editable"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <!--底部区-->
            <span slot="footer" class="dialog-footer" style="margin-right: 30px">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <!--编辑按钮-->
                <el-button type="warning" style="margin-right: 0px" @click="showEdit">编 辑</el-button>
                <el-button type="primary" @click="editBook">确认修改</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            //验证isbn的规则
            var checkCardId = (rule, value, cb) => {//cb为回调函数
                var str = value;
                var arr = new Array();
                arr = str.split(" ");
                if (arr.length != 1) {
                    cb(new Error('输入包含空格！'))
                }
                if (value.length > 20) {
                    cb(new Error('请输入20位以内图书编号'))
                } else {
                    return cb()
                }
            }
            //验证书名的规则
            var checkBookName = (rule, value, cb) => {//cb为回调函数
                var str = value;
                var arr = new Array();
                arr = str.split(" ");
                if (arr.length != 1) {
                    cb(new Error('输入包含空格！'))
                }
                if (value.length > 20 || value.length == 0) {
                    cb(new Error('请输入20字以内书名'))
                } else {
                    return cb()
                }
            }
            //验证作者的规则
            var checkAuthor = (rule, value, cb) => {//cb为回调函数
                var str = value;
                var arr = new Array();
                arr = str.split(" ");
                if (arr.length != 1) {
                    cb(new Error('输入包含空格！'))
                }
                if (value.length > 20) {
                    cb(new Error('请输入20字以内作者名'))
                } else {
                    return cb()
                }
            }
            return {
                newcover: '',
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
                tableData: [],
                categoryData: [],
                value: 105,
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
                    cardId: '',
                    bookName: '',
                    author: '',
                    cid: '200',
                    bookDesc: '',
                    press: '',
                    price: 0,
                    count: 0,
                    cover: '',
                    bookShelf: 1,
                    bookFloor: 1,
                    // category: '',
                    // pressDate: '',
                    // publishDate: ''
                },
                //添加表单的验证规则对象
                addFormRules: {
                    // category: [
                    //     {required: true, message: '请提交类别', trigger: 'blur'},
                    //
                    // ],
                    cardId: [
                        {required: true, message: '请输入图书编号', trigger: 'blur'},
                        {
                            // max: 40,
                            // message: '图书编号长度应在40个字符以内',
                            validator: checkCardId,
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                    bookName: [
                        {required: true, message: '请设置书名', trigger: 'blur'},
                        {
                            validator: checkBookName,
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                    author: [
                        {required: true, message: '请设置作者名', trigger: 'blur'},
                        {
                            validator: checkAuthor,
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                    count: [
                        // {required: true, message: '请设置作者名', trigger: 'blur'},
                        // {
                        //     validator: checkCount,
                        //     trigger: 'blur'//在失去焦点时触发验证
                        // }
                    ],
                    // count: [
                    //     {required: true, message: '请设置书籍数量', trigger: 'blur'},
                    //     {
                    //         validator: checkAuthor,
                    //         trigger: 'blur'//在失去焦点时触发验证
                    //     }
                    // ],
                },
                //编辑表单的验证规则对象
                editFormRules: {
                    cardId: [
                        {required: true, message: '请输入图书编号', trigger: 'blur'},
                        {
                            // max: 40,
                            // message: '图书编号长度应在40个字符以内',
                            validator: checkCardId,
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                    bookName: [
                        {required: true, message: '请设置书名', trigger: 'blur'},
                        {
                            validator: checkBookName,
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                    author: [
                        {required: true, message: '请设置作者名', trigger: 'blur'},
                        {
                            validator: checkAuthor,
                            trigger: 'blur'//在失去焦点时触发验证
                        }
                    ],
                    // count: [
                    //     {required: true, message: '请设置书籍数量', trigger: 'blur'},
                    //     {
                    //         validator: checkCount,
                    //         trigger: 'blur'//在失去焦点时触发验证
                    //     }
                    // ],
                },
                //控制修改用户对话框的显示与隐藏
                editDialogVisible: false,
                //编辑用户的表单数据
                editForm: {
                    id: 0,
                    cardId: '',
                    bookName: '',
                    author: '',
                    bookDesc: '',
                    press: '',
                    price: 22,
                    count: 22,
                    bookShelf: 22,
                    bookFloor: 22,
                    cid: 200,
                    cover: '',
                },
                editable: true,
            }
        },

        created() {
            this.getBook();
            this.getCategory();
        },

        methods: {
            handleRemove(file) {
                console.log(file);
                file.url = null;
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleDownload(file) {
                console.log(file);
            },
            fileuploadSuccess(file) {
                console.log(file);
                this.$message.success(file.message)
                this.addForm.cover = file.data
            },
            editfileuploadSuccess(file) {
                console.log(file);
                this.$message.success(file.message)
                this.editForm.cover = file.data
            },
            showEdit() {
                if (this.editable) {
                    this.editable = false;
                } else {
                    this.$message.error("已经可以编辑了哦")
                }
            },
            getBook() {
                this.$http.get(
                    this.MYLINK.link2 + "/admin/book/select/"
                    + this.queryInfo.pagesize
                    + "/" + this.queryInfo.pagenum)
                    .then(res => {
                        console.log("——————获取书籍数据——————");
                        console.log(res.data.data);
                        this.total = res.data.data.total;
                        this.tableData = res.data.data.list;
                    });
            },
            //获取类别表
            getCategory() {
                this.$http.get(this.MYLINK.link2 + "/admin/category/select/20/1")
                    .then(res => {
                        console.log("getCategory类别表查询数据：");
                        console.log(res.data.data);
                        console.log(this.queryInfo.pagesize);
                        console.log(this.queryInfo.pagenum);
                        this.categoryData = res.data.data.list;
                    });
            },
            //展示编辑用户对话框
            handleEdit(id) {
                console.log("编辑界面id数据");
                console.log(id);
                console.log(id.author);
                console.log(id.bookName);
                // this.editForm = id;
                console.log(this.editForm);
                this.$http.get(this.MYLINK.link2 + "/admin/book/get/" + id.id)
                    .then(res => {
                        console.log("编辑界面res数据");
                        // this.total = res.data.data.list.length;
                        if (res.data.code == 200) {
                            this.$message.success(res.data.message)
                        } else {
                            this.$message.error(res.data.message)
                        }
                        console.log(res.data.data)
                        this.editForm.id = res.data.data.id;
                        this.editForm.cardId = res.data.data.cardId;
                        this.editForm.bookName = res.data.data.bookName;
                        this.editForm.author = res.data.data.author;
                        this.editForm.bookDesc = res.data.data.bookDesc;
                        this.editForm.press = res.data.data.press;
                        this.editForm.price = res.data.data.price;
                        this.editForm.count = res.data.data.count;
                        this.editForm.bookShelf = res.data.data.bookShelf;
                        this.editForm.bookFloor = res.data.data.bookFloor;
                        this.editForm.cover = res.data.data.cover;
                        this.value = res.data.data.category.categoryName;
                        this.editForm.cid = res.data.data.category.id;
                        console.log("赋值表单后的editForm")
                        console.log(this.editForm)
                        console.log("——————————————————————")
                    });
                this.editDialogVisible = true;
            },
            //根据id删除书籍信息
            handleDelete(id) {
                this.$confirm(id + '此操作将永久删除该书籍的数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$http.delete(this.MYLINK.link2 + '/admin/book/delete/' + id)
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            } else {
                                this.$message.error('删除失败')
                            }
                            //刷新用户数据表格
                            this.getBook()
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //监听pagesize改变事件
            handleSizeChange(newSize) {
                console.log(newSize);
                this.queryInfo.pagesize = newSize;
                this.getBook();
            },
            //监听页码值改变事件
            handleCurrentChange(newPage) {
                console.log(newPage)
                this.queryInfo.pagenum = newPage;
                this.getBook();
            },
            //监听对话框的关闭事件
            addDialogClosed() {
                //为下次打开清空表单
                this.$refs.addFormRef.resetFields();
            },
            //点击确认按钮，添加新书
            addBook() {
                this.$refs.addFormRef.validate(async (valid) => {
                    // valid==true 表示通过表单校验
                    if (!valid) return;
                    console.log(valid);
                    this.addForm.cid = this.value;
                    const {data: res} = await this.$http.post(
                        this.MYLINK.link2 + '/admin/book/save',
                        this.$qs.stringify(this.addForm));
                    if (res.code !== 200) {
                        this.$message.error(res.message)
                    }
                    console.log(res);
                    console.log("————表单提交的数据————");
                    console.log(this.addForm);
                    console.log("————下拉框的value为：————");
                    console.log(this.value);
                    this.$message.success(res.message)
                    //隐藏用户对话框
                    this.addDialogVisible = false
                    //重新刷新用户列表数据
                    this.getBook()
                })
            },
            //监听编辑用户对话框关闭事件
            editDialogClosed() {
                this.editable = true;
                //resetFields()清空对话框的输入框
                this.$refs.editFormRef.resetFields();
            },
            //提交修改后的书籍信息的表单
            editBook() {
                if(!isNaN(this.value)){
                    this.editForm.cid = this.value
                }
                console.log("提交value返回数据")
                console.log(this.value)
                console.log("提交CID返回数据")
                console.log(this.editForm.cid)
                //validate验证表单
                this.$refs.editFormRef.validate(valid => {
                    //如果验证输入不合法，valid返回false
                    if (!valid) return
                    this.$http.put(
                        this.MYLINK.link2 + '/admin/book/update',
                        // stringify()转为字符串
                        this.$qs.stringify(this.editForm)
                        // this.editForm
                    ).then(res => {
                            console.log("提交修改返回状态")
                            console.log(res.status)
                            console.log(res)
                            this.getBook();
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
                    this.getBook()

                })
            }
        },
    }
</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .el-pagination {
        position: center;
    }

    .block {
        margin-left: 50%;
        transform: translateX(-60%)
    }

    .editFormclass .el-form .el-form-item {
        width: 300px;
        float: left;
    }

    .formdiv {
        width: 100%;
        height: 275px;
    }

    .editFormclass .el-form .el-form-item .el-input {
        width: 200px
    }

    .addformdiv {
        width: 100%;
        height: 400px;
    }

    .addFormclass .el-form .el-form-item {
        width: 300px;
        float: left;
    }

    .addFormclass .el-form .el-form-item .el-input {
        width: 200px
    }
</style>