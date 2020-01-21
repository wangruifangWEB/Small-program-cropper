//index.js
import CanvasDrag from '../../components/canvas-drag/canvas-drag';


Page({
  data: {
    graph: {},
    canvasWidth: 750,
    canvasHeight: 750
  },
  onLoad: function (options) {
    var width,
      that = this;
    wx.createSelectorQuery().select('#canvas-drag').boundingClientRect(function (rect) {
      console.log(rect);
      width = rect.width*2  // 节点的宽度
      console.log(width);
      let canvasWidth = width;
      that.setData({
        canvasWidth
      })
    }).exec()
  },
  /**
   * 添加图片
   */
  onAddImage() {
    var that = this;
    wx.chooseImage({
      success: (res) => {
        console.log(res)
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function (res) {
            let ratio = res.width / res.height; //图片的真实宽高比例
            let viewWidth = res.width * 0.2, //设置图片显示宽度，
              viewHeight = viewWidth / ratio; //计算的高度值
            console.log('viewWidth:' + viewWidth);
            console.log('viewHeight:' + viewHeight);
            that.setData({
              graph: {
                w: viewWidth,
                h: viewHeight,
                type: 'image',
                url: res.path,
              }
            });

          }
        })
      }
    })
  },

  /**
   * 导出图片
   */
  onExport() {
    CanvasDrag.export()
      .then((filePath) => {
        console.log(filePath);
        this.uploadTap(filePath)
        // wx.previewImage({
        //   urls: [filePath]
        // })
      })
      .catch((e) => {
        console.error(e);
      })
  },
  onClearCanvas: function (event) {
    let _this = this;
    _this.setData({
      canvasBg: null
    });
    CanvasDrag.clearCanvas();
  },

  onUndo: function (event) {
    CanvasDrag.undo();
  }
});