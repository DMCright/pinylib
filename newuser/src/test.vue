<template>
    <div>
    <el-table
            ref="filterTable"
            :data="tableData"
            style="width: 100%">
        <el-table-column
                prop="date"
                label="日期"
                sortable
                width="180"
                column-key="date"
        >
        </el-table-column>
        <el-table-column
                prop="name"
                label="姓名"
                width="180">
        </el-table-column>
        <el-table-column
                prop="address"
                label="地址">
        </el-table-column>
        <el-table-column
                prop="tag"
                label="标签"
                width="100"
                :filters="[
                    { text: '家', value: '家' },
                    { text: '公司', value: '公司'}]"
                :filter-method="filterTag"
        >
            <template slot-scope="scope">
                <el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'">
                    {{scope.row.tag}}
                </el-tag>
            </template>
        </el-table-column>
    </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    tag: '家'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    tag: '公司'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    tag: '家'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                    tag: '公司'
                }]
            }
        },
        methods: {
            filterTag(value, row) {
                console.log("————打印row————");
                console.log(row);
                console.log("————打印value————");
                console.log(value);
                return row.tag === value;
            },
        }
    }
</script>