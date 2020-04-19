<template>
  <div class="cart-bottom-bar">
    <div class="check-all">
      <check-botton class="check-botton" :is-check="isCheckAll" @click.native="checkClick"></check-botton>
      <span>全选</span>
    </div>
    <div class="total-price">
      <span>合计: {{totalPrice}}</span>
    </div>
    <div class="calc">
      <span>去计算({{cartLength}})</span>
    </div>
  </div>
</template>

<script>
import CheckBotton from "@/components/content/checkButton";

import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  components: {
    CheckBotton
  },

  computed: {
    ...mapGetters(["cartList"]),

    // 计算金额
    totalPrice() {
      return (
        "¥" +
        this.cartList
          .filter(e => {
            return e.checked;
          })
          .reduce((perValue, e) => {
            return perValue + e.price * e.count;
          }, 0)
          .toFixed(2)
      );
    },

    // 数量
    cartLength() {
      return this.cartList.filter(e => e.checked).length;
    },

    //判断是否是全选，判断当购物车为0是，全选为false，用find方法，当找到一个没有选中时，全选为false，如果没有找到返回underfind，!underfind为true。秒啊
    isCheckAll() {
      if (this.cartList.length === 0) return false;
      return !this.cartList.find(e => !e.checked);
    }
  },

  methods: {
    //   点击全选
    //1.  当全选为true时，勾选全部商品为false，当全选为false时，勾选全部商品为true
    checkClick() {
      if (this.isCheckAll) {
        this.cartList.map(e => (e.checked = false));
      } else {
        this.cartList.map(e => (e.checked = true));
      }
    }
  }
};
</script>

<style scoped>
.cart-bottom-bar {
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  background-color: #eee;
}

.check-all {
  display: flex;
  justify-content: center;
  width: 80px;
}
.check-botton {
  margin-right: 5px;
  width: 20px;
  height: 20px;
}

.total-price {
  flex: 1;
}

.calc {
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: red;
}
</style>