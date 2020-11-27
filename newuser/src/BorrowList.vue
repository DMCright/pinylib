<template>
    <div>
<!--        <el-button-->
<!--                size='normal'-->
<!--                type="primary"-->
<!--                @click="showOwe">-->
<!--            显示未返还用户-->
<!--        </el-button>-->
        <!--        用户表格-->
        <el-table
                :data="tableData"
                style="width: 100%;padding: 0px 0px"
                stripe
                border="3px"
        >

            <el-table-column
                    label="书名"
                    prop="book.bookName">
            </el-table-column>
            <el-table-column
                    label="借阅时间"
                    prop="lendDate">
            </el-table-column>
            <el-table-column
                    label="返还时间"
                    prop="returnDate">
            </el-table-column>
            <el-table-column
                    label="用户ID"
                    prop="user.id"
                    width="68px">
            </el-table-column>
            <el-table-column
                    label="借书用户"
                    prop="user.username">
            </el-table-column>
            <el-table-column
                    width="120px"
                    label="是否返还"
                    prop="status"
                    :filters="[
                    { text: '已还', value: 1 },
                    { text: '未还', value: 0 }]"
                    :filter-method="filterStatus">
                <template slot-scope="scope">
                    <span style="margin-left:0px">
                        {{ scope.row.status?lable1:lable0 }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column width="180px">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="news(scope.row.id)"
                                type="primary"
                        >详情
                        </el-button>
                        <el-button
                                size="mini"
                                type="primary"
                                @click="returnBook(scope.$index, scope.row)">返还书籍
                        </el-button>
                    </template>
            </el-table-column>
            <!--            </div>-->
        </el-table>
        <!--        分页区域-->
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[15,20]"
                    :page-size="queryInfo.pagesize"
                    layout="sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
        <!--        借阅详情弹窗-->
        <el-dialog
                title="借阅详情"
                :visible.sync="newsDialogVisible"
                width="70%"
                top="10px"
        >

            <!--            借阅信息详情表格-->
            <el-table
                    :data="newsData"
                    border
                    style="width: 100%;padding: 0px;margin: 0px">
                <el-table-column
                        prop="lendDate"
                        label="借阅日期">
                </el-table-column>
                <el-table-column
                        prop="returnDate"
                        label="归还日期">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="是否归还">
                </el-table-column>
            </el-table>
            <br>
            <!--用户详情表格-->
            <el-table
                    :data="newsData"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="user.username"
                        label="借阅人">
                </el-table-column>
                <el-table-column
                        prop="user.telephone"
                        label="手机号">
                </el-table-column>
                <el-table-column
                        prop="user.email"
                        label="邮箱">
                </el-table-column>
                <el-table-column
                        prop="user.registerDate"
                        label="注册日期">
                </el-table-column>
            </el-table>
            <br>
            <!--            书籍详情表格-->
            <el-table
                    :data="newsData"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="book.bookName"
                        label="书名">
                </el-table-column>
                <el-table-column
                        prop="book.cardId"
                        label="图书编号">
                </el-table-column>
                <el-table-column
                        prop="book.cid"
                        label="类别">
                </el-table-column>
                <el-table-column
                        prop="book.press"
                        label="出版社">
                </el-table-column>
            </el-table>
            <br>
            <el-table
                    :data="newsData"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="book.count"
                        label="数量">
                </el-table-column>
                <el-table-column
                        prop="book.bookShelf"
                        label="所在书架">
                </el-table-column>
                <el-table-column
                        prop="book.bookFloor"
                        label="所在楼层">
                </el-table-column>
                <el-table-column
                        prop="book.publishDate"
                        label="上架时间">
                </el-table-column>
                <el-table-column
                        prop="book.totalClickCount"
                        label="总点击量">
                </el-table-column>
            </el-table>

            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="newsDialogVisible = false">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                search: '',
                queryInfo: {
                    query: '',
                    //当前页数
                    pagenum: 1,
                    //每页显示多少数据
                    pagesize: 15
                },
                total: 233,
                // 借阅详情弹窗的是否展开属性newsDialogVisible
                newsDialogVisible: false,
                //借阅详情的所有数据
                newsData: [],
                buttonMessage: '所有历史',
                showAll: true,
                // radio1:true,
                // radio2:mtrue,
                // checkflag:true,
                lable1: '已还',
                lable0: '未还',
            }
        },

        created() {
            this.getHistory();
        },

        methods: {
            showOwe(){

            },
            filterStatus(value, row) {
                // this.getHistory();
                return row.status === value;
            },
            getHistory() {
                // this.$http.get(this.MYLINK.link2+"admin/userBook/select/100/1")
                //     .then(res => {
                //         this.total = res.data.data.total;
                //         console.log(this.total);
                //     });
                this.$http.get(this.MYLINK.link2 + "/admin/userBook/select/"
                    + this.queryInfo.pagesize + "/" + this.queryInfo.pagenum)
                    .then(res => {
                        this.total = res.data.data.total;
                        this.tableData = res.data.data.list;
                        console.log(res.data.data);
                    });
            },
            //监听pagesize改变事件
            handleSizeChange(newSize) {
                console.log(newSize);
                this.queryInfo.pagesize = newSize;
                this.getHistory();
            },
            //监听页码值改变事件
            handleCurrentChange(newPage) {
                console.log(newPage)
                this.queryInfo.pagenum = newPage;
                this.getHistory();
            },
            news(id) {
                console.log(id);
                this.newsDialogVisible = true;
                this.$http.get(this.MYLINK.link2 + "/admin/userBook/get/" + id)
                    .then(res => {
                        console.log("@@@");
                        console.log(res.data.data);
                        // this.newsData = res.data.data;
                        // this.newsData[0] = res.data.data;
                        this.newsData = [];
                        this.newsData.push(res.data.data);
                        // console.log(this.newsData);
                        // this.newsData.push(res.data.data[0]);
                        //  console.log(this.newsData[0]);
                        // console.log(this.newsData.lendDate);
                    });
            },
            returnBook(index, row) {
                console.log('点击返还书籍按钮');
                if(row.status==1){
                    return this.$message.error('请勿重复还书！')
                }
                console.log(row);
                this.$http.post(this.MYLINK.link15001 + '/admin/returnBook/' + row.id)
                    .then(res => {
                        if (res != null) {
                            console.log(res)
                            if (res.data.code == 200) {
                                this.$message.success("还书成功！")
                                this.loadTableData()
                            } else {
                                this.fail(res.data.message)
                                this.$message.error('还书失败')
                            }
                        } else {
                            this.$message.error("访问失败")
                        }
                    }).catch((e) => {
                    this.fail("无法访问")
                    // this.$message.success("书籍已还")
                    console.log(e)
                })
                // this.$message.success('还书成功')
                this.getHistory();
            },
            toggleHistory() {
                // console.log(this.buttonMessage);
                console.log(this.showAll);
                // if (this.showAll) {
                //     this.showAll = false;
                // } else {
                //     this.showAll = true;
                //     this.buttonMessage = '所有历史'
                // }
            }
        },
    }
</script>

<style scoped>
    .el-pagination {
        position: center;
    }

    .buttonRow {
        height: 35px;
        margin-left: 50%;
        transform: translateX(-50%)
    }

    .block {
        margin-left: 50%;
        transform: translateX(-60%)
    }
</style>