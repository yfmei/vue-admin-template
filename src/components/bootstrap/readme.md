# vue 整合 bootstrap
- 安装
```cmd
# 安装bootstrap及依赖
npm install bootstrap jquery popper --save

# 安装预编译sass
npm node-sass --save --dev

# 加载sass/scss并编译成css
npm sass-loader --save --dev

```
- App.vue 引入 bootstrap.scss, 就可以使用bootstrap样式了
```html
<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>
```

- 定制 bootstrap scss
  - 在 bootstrap.scss 之前引入
```html
<style lang="scss">
@import './style/custom-bootstrap.scss';
@import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>
```
```sass
// Import custom font from Google
@import url('https://fonts.googleapis.com/css?family=Raleway');

// Override / set color variables
$white: #fff;
$black: #000;
$green: #00e389;
$blue: #3399ff;
$orange: #f26c22;
$yellow: #ffd925;
$red: #e5001e;

// Create grayscale
$gray-dark: #292b2c;
$gray: #3f3f3f;
$gray-light: #7e7e7e;
$gray-lighter: #ededed;
$gray-lightest: #fafafa;

// Set brand colors
$primary: $blue;
$success: $green;
$info: $yellow;
$warning: $orange;
$danger: $red;

// Override button colors
$btn-info-color: darken($info, 45);

// Override alert background colors
$state-success-bg: lighten($success, 30);
$state-info-bg: lighten($info, 30);
$state-warning-bg: lighten($warning, 30);
$state-danger-bg: lighten($danger, 45);

// Override alert text colors
$state-success-text: darken($success, 30);
$state-info-text: darken($info, 30);
$state-warning-text: darken($warning, 30);
$state-danger-text: darken($danger, 10);

// Override badges padding (doubled because otherwise too crammed)
$badge-padding-x: 0.8em;
$badge-padding-y: 0.4em;

// Don't make badges normal instead of bold
$badge-font-weight: normal;

// Override fonts
$font-family-sans-serif: 'Raleway', sans-serif;
$font-family-serif: Georgia, 'Times New Roman', Times, serif;
$font-family-monospace: Menlo, Monaco, Consolas, 'Liberation Mono',
  'Courier New', monospace;
$font-family-base: $font-family-sans-serif;

// Set global options
$enable-shadows: false;
$enable-gradients: true;
```


# node-sass
- Node-sass是一个库, 它为Node.js提供绑定到LibSass, 这是流行的样式表预处理器Sass的C版本. 它允许您以令人难以置信的速度本地编译.scss文件到css, 
并通过连接中间件自动编译. 
