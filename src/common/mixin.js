import {debounce} from "common/utils";
import {BACK_POSITION} from 'common/const';

import BackTop from "components/content/backTop/BackTop";


// 1.监听图片完成事件
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null,
    }
  },
  mounted() {

    // 拿到了在防抖函数的返回函数，图片完成加载事件中，调用refresh
    this.refresh = debounce(this.$refs.scroll.reFresh, 250);
    this.itemImgListener = () => {
      this.refresh();
    };
    this.$bus.$on("upLoadImg", this.itemImgListener);
    console.log("我是混入的对象")
  }
}

// 2.回到顶部
export const backTop = {
  components: {
    BackTop
  },
  data() {
    return {
      is_show_backTop: false, //控制显示返回顶部按钮

    }
  },
  methods: {
    handlebackTop() {
      console.log(this.$refs.scroll); //通过$refs可以获取组件里的对象
      this.$refs.scroll.scrollTo(0, 0);
    },
    listenShowBackTop(position) {
      // 1.判断backTop是否显示
      this.is_show_backTop = -position.y > BACK_POSITION;
    }
  },
}
