(function() {
  var HolyCarousel;

  $.fn.tojqa = function() {
    var arr, i;
    arr = new Array(this.length);
    i = 0;
    this.each(function() {
      return arr[i++] = $(this);
    });
    return arr;
  };

  HolyCarousel = {
    init: function(opts) {
      this.each(function() {
        var $slides, $this, data, slides;
        $this = $(this);
        this.className += ' holycarousel';
        data = $this.data('holycarousel');
        $slides = $this.children();
        $slides.wrapAll('<div class="holy-rail" style="margin-left: 0; width:9999%; margin-left: 0;"></div>');
        slides = $slides.tojqa();
        $slides.width($this.width());
        if (!data) {
          $this.data('holycarousel', {
            opts: $.extend({}, {
              responsive: true,
              alterHeight: false,
              pagerItemText: null
            }, opts),
            slides: slides,
            currentIndex: 0,
            pagerItemSets: []
          });
        }
        data = $this.data('holycarousel');
        opts = opts || data.opts;
        if (opts.responsive) {
          $(window).resize(function() {
            return HolyCarousel.respond.apply($this, arguments);
          });
          if (opts.alterHeight) {
            return $this.height(slides[0].outerHeight(true));
          }
        }
      });
      return this;
    },
    respond: function() {
      var currentIndex, data, innerWidth, marginLeft, outerSpace, slide, slides, _i, _len;
      data = this.data('holycarousel');
      slides = data.slides;
      currentIndex = data.currentIndex;
      outerSpace = slides[0].outerWidth(true) - slides[0].width();
      innerWidth = this.width();
      for (_i = 0, _len = slides.length; _i < _len; _i++) {
        slide = slides[_i];
        slide[0].style.width = innerWidth + 'px';
      }
      marginLeft = -Math.abs(slides[data.currentIndex].position().left);
      $('.holy-rail', this).css('margin-left', marginLeft + 'px');
      if (data.opts.alterHeight) {
        this.height(slides[currentIndex].outerHeight(true));
      }
      return this;
    },
    slideTo: function(targetIndex) {
      var currentHeight, currentIndex, data, high, i, low, marginLeft, maxHeight, numPagerItems, pagerItem, pagerItemSet, self, slides, _i, _j, _k, _len, _ref, _ref1, _ref2;
      self = this;
      data = this.data('holycarousel');
      slides = data.slides;
      if (data != null) {
        if ((_ref = data.opts) != null) {
          if (typeof _ref.beforeSlide === "function") {
            _ref.beforeSlide(self, targetIndex);
          }
        }
      }
      currentIndex = data.currentIndex;
      marginLeft = -Math.abs(slides[targetIndex].position().left);
      if (data.opts.alterHeight) {
        high = Math.max(currentIndex, targetIndex);
        low = Math.min(currentIndex, targetIndex);
        maxHeight = 0;
        for (i = _i = low; _i <= high; i = _i += 1) {
          currentHeight = slides[i].outerHeight(true);
          if (currentHeight > maxHeight) {
            maxHeight = currentHeight;
          }
        }
        this.height(maxHeight);
      }
      $('.holy-rail', this).animate({
        marginLeft: marginLeft
      }, function() {
        var _ref1;
        if (data != null) {
          if ((_ref1 = data.opts) != null) {
            if (typeof _ref1.afterSlide === "function") {
              _ref1.afterSlide(self, data.currentIndex);
            }
          }
        }
        if (data.opts.alterHeight) {
          return self.height(slides[targetIndex].outerHeight(true));
        }
      });
      if (data.pagerItemSets != null) {
        numPagerItems = data.pagerItemSets[0].length;
        _ref1 = data.pagerItemSets;
        for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
          pagerItemSet = _ref1[_j];
          for (i = _k = 0, _ref2 = numPagerItems - 1; _k <= _ref2; i = _k += 1) {
            pagerItem = pagerItemSet[i];
            if (i === targetIndex) {
              pagerItem.addClass('active');
            } else {
              pagerItem.removeClass('active');
            }
          }
        }
      }
      data.currentIndex = targetIndex;
      return this;
    },
    next: function() {
      var data;
      data = this.data('holycarousel');
      HolyCarousel.slideTo.apply(this, [(data.currentIndex + 1) % data.slides.length]);
      return this;
    },
    prev: function() {
      var currentIndex, data, numSlides, targetIndex;
      data = this.data('holycarousel');
      currentIndex = data.currentIndex;
      if (currentIndex === 0) {
        numSlides = data.slides.length;
        targetIndex = numSlides - 1;
      } else {
        currentIndex = data.currentIndex;
        targetIndex = currentIndex - 1;
      }
      HolyCarousel.slideTo.apply(this, [targetIndex]);
      return this;
    },
    generate: function(controlName) {
      var control;
      switch (controlName) {
        case 'pager':
          control = HolyCarousel._generatePager.apply(this, []);
          break;
        case 'next-button':
          control = HolyCarousel._generateNextButton.apply(this, []);
          break;
        case 'prev-button':
          control = HolyCarousel._generatePrevButton.apply(this, []);
      }
      return control;
    },
    _generatePager: function() {
      var currentIndex, data, i, numSlides, opts, pager, pagerItem, pagerItems, self, _i, _ref;
      self = this;
      pager = $('<span class="holycarousel pager"></span>');
      data = this.data('holycarousel');
      opts = data.opts;
      currentIndex = data.currentIndex;
      numSlides = data.slides.length;
      pagerItems = [];
      for (i = _i = 0, _ref = numSlides - 1; _i <= _ref; i = _i += 1) {
        pagerItems.push(pagerItem = $('<span class="holycarousel pager-item"></span>'));
        if (i === currentIndex) {
          pagerItem.addClass('active');
        }
        if (opts.pagerItemText === null) {
          pagerItem.html('' + (i + 1));
        } else {
          pagerItem.html(opts.pagerItemText);
        }
        pagerItem.click({
          i: i
        }, function(e) {
          return HolyCarousel.slideTo.apply(self, [e.data.i]);
        });
        pager.append(pagerItem);
      }
      data.pagerItemSets.push(pagerItems);
      this.data('holycarousel', data);
      return pager;
    },
    _generateNextButton: function() {
      var nextBtn, self;
      self = this;
      nextBtn = $('<span class="holycarousel next"></span>');
      return nextBtn.click(function() {
        return HolyCarousel.next.apply(self, []);
      });
    },
    _generatePrevButton: function() {
      var prevBtn, self;
      self = this;
      prevBtn = $('<span class="holycarousel prev"></span>');
      return prevBtn.click(function() {
        return HolyCarousel.prev.apply(self, []);
      });
    }
  };

  jQuery.fn.holycarousel = jQuery.fn.holyCarousel = $.fn.holycarousel = $.fn.holyCarousel = function(method) {
    if (HolyCarousel[method]) {
      return HolyCarousel[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return HolyCarousel.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.holyCarousel');
    }
    return this;
  };

}).call(this);
