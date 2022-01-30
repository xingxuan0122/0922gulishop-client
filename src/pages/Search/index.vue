<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="removeCategoryName">×</i>
            </li>
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li class="active">
                  <a href="#">综合</a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods, index) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"><img :src="goods.defaultImg" style="width: 100%; height: 100%" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>  {{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">
                      {{ goods.title }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>

            </ul>
          </div>
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  import {mapGetters} from "vuex";

  export default {
    name: 'Search',
    components: {
      SearchSelector
    },
    data() {
      return {
        searchParams:{
          // 这个对象我们称作叫初始化所有的搜索参数,只不过一上来所有的搜索条件，我们都是空的
          // 今后只要是作为搜索条件的，所有相关数据，全部现在这个对象内部初始化好
          category1Id: '',
          category2Id: '',
          category3Id: '',
          categoryName: '',
          keyword: '',
          props: [],
          trademark: '',

          // 默认的搜索条件
          order: "1:desc", // 排序规则，排序是后台排序的，我们搜索的时候得给后台一个默认的排序规则
          pageNo: 1, // 搜索第几页的商品，分页也是后台做好的，我们也是得告诉后台我们要第几个数据
          pageSize: 10 // 每页多少个商品，告诉后台，每页回来多少个商品，默认10个
        }
      }
    },
    // 按照三级分类和关键字进行搜索
    beforeMount() {
      // 在点击三级分类或者点击搜索按钮跳过来发请求之前，把对应的三级分类名称和id或者关键字keyword,
      // 添加到data当中searchParams对应的搜索项当中
      // 浅拷贝
      this.hanlderSearchParams()
    },
    mounted() {
      // 点击跳转过来，是在这里发请求的
      this.getSearchInfo()
    },
    methods: {
      getSearchInfo() {
        // dispatch 如果传递多个参数，那么多个参数必须构成一个对象去传递
        // 也就是说。dispatch只能传递一个参数
        // this.$store.dispatch('getSearchInfo',{}) //  这里刚开始传空对象只是为了获取数据展示页面
        // 但是我们点击三级分类或者点击搜索按钮跳过来search页面的时候，就已经是有搜索条件了
        // 点击三级分类跳转那么搜索条件就应该是三级分类的id和分类的名称
        // 点击搜索按钮跳转那么搜索条件就应该是自己输入的关键字
        // 所以这个请求，参数不应该是空对象
        this.$store.dispatch('getSearchInfo',this.searchParams)
      },
      hanlderSearchParams() {
        let {category1Id, category2Id, category3Id, categoryName} = this.$route.query
        let {keyword} = this.$route.params
        let searchParams = {
          ...this.searchParams,
          category1Id,
          category2Id,
          category3Id,
          categoryName,
          keyword
        } // 这样可以保证 searchParams：里面一定包含了我点击传递过来的搜索条件，没有就是undefined

        this.searchParams = searchParams
      },
      // 删除分类名称搜索条件，重新发送请求
      removeCategoryName() {
        this.searchParams.category1Id = undefined
        this.searchParams.category2Id = undefined
        this.searchParams.category3Id = undefined
        this.searchParams.categoryName = undefined
        this.getSearchInfo()
      },
      // 删除关键字搜索条件，重新发送请求
      removeKeyword() {
        this.searchParams.category1Id = undefined
        this.searchParams.category2Id = undefined
        this.searchParams.category3Id = undefined
        this.searchParams.keyword = undefined
        this.getSearchInfo()
      }
    },
    computed: {
      ...mapGetters(['goodsList'])
    },
    watch: {
      $route(newVal, oldVal) {
        this.hanlderSearchParams()
        this.getSearchInfo()
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>