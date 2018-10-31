Page({
  data: {
    animationDatas: [],
  },
  aniMain: function () {
    const query = wx.createSelectorQuery();
    const ref = query.selectAll('.ani-init');
    ref.fields({}, function (res) {
      const animationDatas = [];
      res.forEach(function (node, index) {
        const animation = wx.createAnimation({
          duration: 200,
          delay: 200 * index,
        });
        animation.opacity(1).top(0).step();
        animationDatas.push(animation.export());
      });
      this.setData({ animationDatas });
    }.bind(this)).exec();
  },
  onShow: function () {
    this.aniMain();
  }
})

