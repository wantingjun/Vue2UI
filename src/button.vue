<template>
  <button class="g-button" :class="{[`icon-${iconPosition}`]: true}">
    <svg v-if="icon" class="icon">
      <use :xlink:href="`#i-${icon}`"></use>
    </svg>
    <div class="content">
      <slot></slot>
    </div>
  </button>
</template>
<script>
  export default {
   // props: ['icon', 'iconPosition']
    props:{
      icon:{},
      iconPosition:{
        default:'left',
        type:String,
        validator(value){
          return !(value !== "left" && value !== 'right');
        }
      }
    }
  }
</script>
<style lang="scss">
  .g-button {
    font-size: var(--font-size);
    height: var(--button-height);
    padding: 0 0.5em;
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    background: var(--button-bg);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    &:hover {
      border-color: var(--border-color-hover);
    }
    &:active {
      background-color: var(--button-active-bg);
    }
    &:focus {
      outline: none;
    }
    > .icon{ // 默认icon在前面
      order:1;
      margin-right:.3em;
    }
    > .content{ //content在后面
      order:2
    }
    &.icon-right{ //如果设置了icon-right
      > .icon{ //icon在后面
        order:2;
        margin-right:0;
        margin-left:.3em;
      }
      > .content{ // content在前面
        order:1
      }

    }
  }

</style>
