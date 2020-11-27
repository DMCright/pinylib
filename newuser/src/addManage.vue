<template>
    <el-card class="box-card" style="margin: 30px 250px;height: 560px">
        <div slot="header" class="clearfix">
            <span>统计管理</span>
        </div>
    <div  id="addmanage">
        <el-row>
            <el-select v-model="value"
                       placeholder="请选择查询条件"
                       style="border:20px">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-date-picker
                    v-model="date"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    :picker-options="pickerOptions">
            </el-date-picker>
            <el-button style="border:20px" @click="OnclickSearch()">搜索</el-button>
        </el-row>

        <transition name="el-fade-in-linear">
            <div class="transition-box boxs">
                <el-table
                        :data="list"
                        style="width: 100%;top:20px"
                        :default-sort = "{prop: 'bookName', order: 'descending'}"
                >
                    <el-table-column
                            prop="bookName"
                            label="书名"
                            sortable
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="dayClickCount"
                            label="日点击量"
                            sortable
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="monthClickCount"
                            label="月点击量"
                            sortable
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="totalClickCount"
                            label="总点击量"
                            sortable
                            width="180">
                    </el-table-column>
                </el-table>
            </div>
        </transition>
    </div>
    </el-card>
</template>

<script>
    export default {
        watch: {
            date(val) {
                console.log(val)
            },
            value(val){
                console.log(val)
            }
        },
        data() {
            return {
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }},
                options: [{
                    value: '0',
                    label: '按日期查询'
                }, {
                    value: '1',
                    label: '按月份查询'
                }, {
                    value: '2',
                    label: '按年份查询'
                }],
                value:'',
                date:'',
                total: 2,
                list: [],
            }
        },
        methods: {
            async getList(){
                console.log(this.date)
                const {data:res} = await this.$http.get(
                    this.MYLINK.link2 + '/admin/selectByClickCount?status='+ this.value +'&pdate='+ this.date)
                console.log("————拿数据————")
                console.log(res)
                this.list = res.data;
            },
            OnclickSearch(){
                this.getList();
            }
        }
    }

</script>

<style scoped>
    .boxs{
        position: absolute;
    }
    #addmanage{
        position: relative;
    }
</style>