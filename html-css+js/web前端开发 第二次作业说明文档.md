## web前端开发 第二次作业说明文档

### 操作说明

水印操作页（watermark）可由主页（homepage）顶部的导航栏或底部的模块标题跳转进入

请避免以本地文件形式直接打开，会出现跨域错误

使用WebStorm打开有助于解决问题

采用的方法

- 可见水印
  - 元素遮罩方式
  - canvas操作像素方式
- 数字水印
  - canvas操作像素方式

### 关键代码说明

- 可见水印

  - 元素遮罩方式

    - 水印参数设置

      ![image-20201215102055199](C:%5CUsers%5CDaiqj%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20201215102055199.png)

    - DOM元素写入

      ![image-20201215102359849](C:%5CUsers%5CDaiqj%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20201215102359849.png)

  - canvas像素操作

    - canvas上下文配置

    - canvas图像写入

    - canvas水印文字写入

      ![image-20201215102517622](C:%5CUsers%5CDaiqj%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20201215102517622.png)

- 数字水印

  - canvas上下文配置

    ![image-20201215102758962](C:%5CUsers%5CDaiqj%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20201215102758962.png)

  - 水印图片像素数据获取

    ![image-20201215102851673](C:%5CUsers%5CDaiqj%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20201215102851673.png)

  - 水印图片编码进源图片的R通道

    若水印图片的R通道有信息，源图片的相应位置的R通道置为奇数，否则置为偶数

    最后将处理过的源图片数据写回画布

    ![image-20201215164504957](C:/Users/Daiqj/AppData/Roaming/Typora/typora-user-images/image-20201215164504957.png)