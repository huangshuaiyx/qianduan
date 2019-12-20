<template>
  <div>
    <el-button @click="$router.push({'name':'spadd'})">添加商品</el-button>
    <h1>商品列表</h1>
    <!-- 搜索 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="商品名">
        <el-input placeholder="商品名" v-model="sgoodsname"></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input placeholder="商品价格" v-model="sprice"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 展示 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="商品图片" width="180">
        <template slot-scope="scope">
          <img
            :src="`http://127.0.0.1:9527${scope.row.imageUrl}` "
            style="width: 180px;height:100px"
          />
        </template>
      </el-table-column>
      <el-table-column label="商品名" prop="goodsname" width="180"></el-table-column>
      <el-table-column label="商品价格" width="180" prop="price"></el-table-column>
      <el-table-column label="上架/下架" width="180">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.showhide"
            active-text="上架"
            inactive-text="下架"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeshowhide(scope.row._id,scope.row.showhide)"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[2, 3, 4, 5]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sgoodsname: "", //搜索商品名
      sprice: "", //搜索价格
      total: 0, //商品总数量
      page: 1, //默认第几页
      limit: 2, //默认每页显示条数
      query: {},
      formInline: {
        user: "",
        region: ""
      },
      tableData: []
    };
  },
  mounted() {
    // 获取总数据
    this.sumsp();
    // 获取 分页的商品信息
    this.pagesp(this.page, this.limit);
  },
  methods: {
    //搜索
    search() {
      // alert(`${this.sgoodsname}--- ${this.sprice}`);
      // 获取总条数
      this.query = {
        search: 1,
        goodsname: this.sgoodsname,
        price: this.sprice
      };
      this.sumsp();
      this.pagesp(this.page, this.limit);
    },
    //改变上架 /下架
    changeshowhide(id, showhideval) {
      // console.log(id, showhideval);
      // 调用接口 。。。。。
      this.axios
        .get("/changeshowhide", {
          params: {
            id: id,
            showhideval: showhideval
          }
        })
        .then(res => {
          if (res.data.err_code == 400) {
            alert("服务器挂了");
          }
        });
    },
    //获取总条数
    sumsp() {
      this.axios
        .get("/sumsp", {
          params: this.query
        })
        .then(res => {
          this.total = res.data.sum;
        });
    },
    // 分页获取数据
    pagesp(page, limit) {
      this.axios
        .get("/pagesp", {
          params: {
            page: page,
            limit: limit,
            ...this.query
          }
        })
        .then(res => {
          console.log(res.data.info);
          this.tableData = res.data.info;
        });
    },

    // 搜索
    onSubmit() {
      console.log("submit!");
    },
    // 表格 修改
    handleEdit(index, row) {
      console.log(index, row);
    },
    //删除。。。。。
    handleDelete(index, row) {
      // console.log(index);
      // console.log(row._id);
      // 调用接口 --- 删除 数据库中 _id == row._id 的这条数据
      this.axios
        .get("/delsp", {
          params: {
            id: row._id
          }
        })
        .then(res => {
          // console.log(res.data)
          if (res.data.err_code == 200) {
            //删除dom
            this.tableData.splice(index, 1);
          }
        });
    },
    // 分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.limit = val;
      this.pagesp(this.page, this.limit, this.query);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      this.pagesp(this.page, this.limit, this.query);
    }
  }
};
</script>