# axios spring 解决跨域问题
- 因为项目进行前后端分离, 就遇上了跨域的问题. 折腾了很久, 这里整理下. 
  - 前后端部署在一起或者用nginx代理了, 就不需要额外的操作了
  - 只是开发需要解决跨域问题, 配置webpack的代理
  - 前后端部署在不同服务器或端口, axios 配置请求url前缀和服务器配置允许跨域

## 配置webpack的代理很简单
```javascript
module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
          // 所有  开头的请求都会代理到 http://localhost:8080/,
          // 也就是如果服务器登录的url: http://localhost:8080/login, 请求url只需要写 /login 即可
          '': {
            target: 'http://localhost:8080/',
            changeOrigin: true
          }
        },
    ...
  }
}
```
> 只能在开发模式下有效

## axios + 服务器配置
### axios **单独设置没用, 需要服务器支持才允许跨域**
```javascript

const service = axios.create({
  baseURL: "http://localhost:8080", // 设置请求前缀
  
  // 设置代理, 没用
  // proxy: {
  //   host: "localhost",
  //   port: 8080
  // },
  // withCredentials: true, // 跨域时携带cookie等认证信息
  // 设置请求头允许跨域, 没用
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    // "Access-Control-Allow-Origin": "http://localhost:8081",
    // "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    // "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
  },
}
```

### 后台
- 有3种方式
  - response.setHeader()
  - JavaConfig
  - 注解 @CrossOrigin
  - 过滤器

- 可以在指定的请求或者拦截器中设置 response 的 header 
  
```
response.setHeader("Access-Control-Allow-Origin", "*"); // 不能设置为 * , 
response.setHeader("Access-Control-Allow-Origin", "http://localhost:8081"); // 要设置为指定ip
``` 

- JavaConfig spring5废弃 WebMvcConfigurerAdapter 类, 貌似需要 Springboot, 先挖个坑...
  改成接口了
```java
@Configuration
public class WebMvcConfg extends WebMvcConfigurerAdapter {
  // todo 废弃
}

@Configuration
public class WebMvcConfg extends WebMvcConfigurationSupport {
  // todo 不推荐
}

// 推荐
@Configuration
public class WebMvcConfg implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:8081")
                .allowedMethods("PUT", "DELETE")
                .allowedHeaders("header1", "header2", "header3")
                .exposedHeaders("header1", "header2")
                .allowCredentials(false).maxAge(3600);
    }
}
```

- 还可以采用注解的方式配置指定的类或请求, 除了比较灵活就是麻烦了
```
@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600)
@Controller

@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600)
@RequestMapping
```

- 过滤器
  
  - 继承 CorsFilter 过滤器

```java
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * 允许跨域
 */
public class MyCorsFilter extends CorsFilter  {

    public MyCorsFilter() {
        super(configurationSource());
    }

    private static UrlBasedCorsConfigurationSource configurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:8081");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
```

  - 加到web.xml中
  
```xml
<!--web.xml-->

<filter>
    <filter-name>MyCorsFilter</filter-name>
    <filter-class>com.ai.ble.base.interceptor.MyCorsFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>MyCorsFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```
