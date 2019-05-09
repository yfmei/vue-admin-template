<template>
  <div>
    <div class="visible-scrollbar">
      Etiam sagittis sem sed lacus laoreet, eu fermentum eros auctor.
      Proin at nulla elementum, consectetur ex eget, commodo ante.
      Sed eros mi, bibendum ut dignissim et, maximus eget nibh. Phasellus
      blandit quam turpis, at mollis velit pretium ut. Nunc consequat
      efficitur ultrices. Nullam hendrerit posuere est. Nulla libero
      sapien, egestas ac felis porta, cursus ultricies quam. Vestibulum
      tincidunt accumsan sapien, a fringilla dui semper in. Vivamus
      consectetur ipsum a ornare blandit. Aenean tempus at lorem sit
      amet faucibus. Curabitur nibh justo, faucibus sed velit cursus,
      mattis cursus dolor. Pellentesque id pretium est. Quisque
      convallis nisi a diam malesuada mollis. Aliquam at enim ligula.
    </div>
    <div class="invisible-scrollbar">Thisisaveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeerylongword</div>
    <div class="mostly-customized-scrollbar">Thisisaveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeerylongword<br>
      And pretty tall<br>
      thing with weird scrollbars.<br>
      Who thought scrollbars could be made weeeeird?</div>
  </div>
</template>

<script>

</script>

<style type="text/scss" scoped>
  .visible-scrollbar, .invisible-scrollbar, .mostly-customized-scrollbar {
    display: block;
    width: 10em;
    overflow-y: auto;
    overflow-x: hidden;
    height: 10em;
  }
  .invisible-scrollbar::-webkit-scrollbar {
    display: none;
  }

  /* 声明滚动条, 除非指定宽度和背景色, 否则不可见*/
  .mostly-customized-scrollbar::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background-color: #aaa; /* or add it to the track */
  }
  /* 滚动块 */
  .mostly-customized-scrollbar::-webkit-scrollbar-thumb {
    background: #000;
  }
</style>
