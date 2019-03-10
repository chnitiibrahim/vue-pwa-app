<template>
  <div class="card-wrap"
       @mousemove="handleMouseMove"
       @mouseenter="handleMouseEnter"
       @mouseleave="handleMouseLeave"
       ref="card">
    <div class="card"
         :style="cardStyle">
      <div class="card-bg" :style="[cardBgTransform, cardBgGradient]"></div>
      <div class="card-info">
        <slot name="icon"></slot>
        <slot name="header"></slot>
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Card',
    props: ['background'],
    mounted () {
      this.width = this.$refs.card.offsetWidth
      this.height = this.$refs.card.offsetHeight
    },
    data: () => ({
      width: 0,
      height: 0,
      mouseX: 0,
      mouseY: 0,
      mouseLeaveDelay: null
    }),
    computed: {
      mousePX () {
        return this.mouseX / this.width
      },
      mousePY () {
        return this.mouseY / this.height
      },
      cardStyle () {
        const rX = this.mousePX * 30
        const rY = this.mousePY * -30
        return {
          transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
        }
      },
      cardBgTransform () {
        const tX = this.mousePX * -40
        const tY = this.mousePY * -40
        return {
          transform: `translateX(${tX}px) translateY(${tY}px)`
        }
      },
      cardBgGradient () {
        console.log('>> ', this.background)
        return {
          background: `${this.background}`
        }
      }
    },
    methods: {
      handleMouseMove (e) {
        this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width / 2
        this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height / 2
      },
      handleMouseEnter () {
        clearTimeout(this.mouseLeaveDelay)
      },
      handleMouseLeave () {
        this.mouseLeaveDelay = setTimeout(() => {
          this.mouseX = 0
          this.mouseY = 0
        }, 1000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/sass/variables';

  .title {
    font-size: 24px;
    font-weight: 700;
    color: #5D4037;
    text-align: center;
  }

  .card-wrap {
    margin: 40px 10px 0;
    transform: perspective(800px);
    transform-style: preserve-3d;
    cursor: pointer;

    &:hover {
      .card-info {
        transform: translateY(0);
      }
      .card-info p {
        opacity: 1;
      }
      .card-info, .card-info p {
        transition: 0.6s $hoverEasing;
      }
      .card-info:after {
        transition: 5s $hoverEasing;
        opacity: 1;
        transform: translateY(0);
      }
      .card-bg {
        transition: 0.6s $hoverEasing,
        opacity 5s $hoverEasing;
        opacity: 0.8;
      }
      .card {
        transition: 0.6s $hoverEasing,
        box-shadow 2s $hoverEasing;
        box-shadow: rgba(white, 0.2) 0 0 40px 5px,
        rgba(white, 1) 0 0 0 1px,
        rgba(black, 0.66) 0 10px 60px 0,
        inset #333 0 0 0 5px,
        inset white 0 0 0 6px;
      }
    }
  }

  .card-wrap:last-child {
    margin-bottom: 40px;
  }

  .card {
    position: relative;
    flex: 0 0 240px;
    width: 300px;
    height: 175px;
    background-color: #333;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: rgba(black, 0.66) 0 10px 60px 0,
    inset #333 0 0 0 5px,
    inset rgba(white, 0.5) 0 0 0 6px;
    transition: 1s $returnEasing;
  }

  .card-bg {
    opacity: 0.5;
    position: absolute;
    top: -20px;
    left: -20px;
    width: 100%;
    height: 100%;
    padding: 20px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    transition: 1s $returnEasing,
    opacity 5s 1s $returnEasing;
    pointer-events: none;
  }

  .card-info {
    padding: 20px;
    position: absolute;
    bottom: 0;
    color: #fff;
    transform: translateY(45%);
    transition: 0.6s 1.6s $transition;

    span {
      img {
        width: 60px;
        height: 60px;
      }
    }

    p {
      min-height: 120px;
      font-size: 15px;
      opacity: 0;
      text-shadow: rgba(black, 1) 0 2px 3px;
      transition: 0.6s 1.6s $transition;
    }

    * {
      position: relative;
      z-index: 1;
    }

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
      background-blend-mode: overlay;
      opacity: 0;
      transform: translateY(100%);
      transition: 5s 1s $returnEasing;
    }
  }

  .card-info h1 {
    font-family: "Playfair Display";
    font-size: 36px;
    font-weight: 700;
    text-shadow: rgba(black, 0.5) 0 10px 10px;
  }
</style>
