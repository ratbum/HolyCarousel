$.fn.tojqa = () ->
	arr = new Array(this.length) # Substantial performance gain
	i = 0
	this.each ->
		arr[i++] = $(this);
	arr


HolyCarousel = 
	init: (opts) ->
		this.each ->
			$this = $(this)
			
			this.className += ' holycarousel'
			data = $this.data('holycarousel');
			
			$slides = $this.children()
			$slides.wrapAll('<div class="holy-rail" style="margin-left: 0; width:9999%; margin-left: 0;"></div>')
			slides = $slides.tojqa()
			
			$slides.width($this.width())
			
			if not data
				$this.data('holycarousel', {
					opts: opts or {
						responsive:true
						alterHeight: false
					}
					slides: slides
					currentIndex: 0
					pagerItemSets: []
				})
			data = $this.data('holycarousel')
			opts = opts or data.opts
				
			if opts.responsive
				$(window).resize ->
					HolyCarousel.respond.apply($this, arguments)
				if opts.alterHeight
					$this.height(slides[0].outerHeight(true))
		this
					
	respond:() ->
		data = this.data('holycarousel')
		slides = data.slides
		currentIndex = data.currentIndex
		outerSpace = slides[0].outerWidth(true) - slides[0].width()		
		innerWidth = @width()
		
		for slide in slides
			slide[0].style.width = innerWidth + 'px'
		
		marginLeft = -Math.abs(slides[data.currentIndex].position().left)
		$('.holy-rail', this).css('margin-left', marginLeft+'px')
		if data.opts.alterHeight
			this.height(slides[currentIndex].outerHeight(true))
		this
			
	slideTo:(targetIndex) ->
		self = this
		data = @data('holycarousel')
		slides = data.slides
		data?.opts?.beforeSlide?(self, targetIndex)
		currentIndex = data.currentIndex
		marginLeft = -Math.abs(slides[(targetIndex)].position().left)
		
		if data.opts.alterHeight
			high = Math.max(currentIndex, targetIndex)
			low = Math.min(currentIndex, targetIndex)
			maxHeight = 0
			for i in [low..high] by 1
				currentHeight = slides[i].outerHeight(true)
				maxHeight = currentHeight if currentHeight > maxHeight
			@height(maxHeight)
				
			
		$('.holy-rail', this).animate({
			marginLeft: marginLeft
		}, -> 
			data?.opts?.afterSlide?(self, data.currentIndex)
				
			if data.opts.alterHeight
				self.height(slides[targetIndex].outerHeight(true))
		)
		
		if data.pagerItemSets?
			numPagerItems = data.pagerItemSets[0].length
			for pagerItemSet in data.pagerItemSets
				for i in [0..numPagerItems-1] by 1
					pagerItem = pagerItemSet[i]
					if i is targetIndex
						pagerItem.addClass('active')
					else
						pagerItem.removeClass('active')
		
		data.currentIndex = targetIndex
		this
	
	next:() ->
		data = this.data('holycarousel')
		HolyCarousel.slideTo.apply(this, [(data.currentIndex + 1) % data.slides.length])
		this
		
	prev:() ->
		data = this.data('holycarousel')
		currentIndex = data.currentIndex
		if currentIndex is 0
			numSlides = data.slides.length
			targetIndex = numSlides - 1
		else
			currentIndex = data.currentIndex
			targetIndex = currentIndex - 1
			
		HolyCarousel.slideTo.apply(this, [targetIndex])
		this
	
	generate:(controlName) ->
		switch controlName
			when 'pager'
				control = HolyCarousel._generatePager.apply(this, [])
			when 'next-button'
				control = HolyCarousel._generateNextButton.apply(this, [])
			when 'prev-button'
				control = HolyCarousel._generatePrevButton.apply(this, [])
		control

	
	_generatePager:() ->
		self = this
		pager = $('<span class="holycarousel pager"></span>')
		data = this.data('holycarousel')
		currentIndex = data.currentIndex
		numSlides = data.slides.length
		
		pagerItems = []
		for i in [0..numSlides-1] by 1
			pagerItems.push(pagerItem = $('<span class="holycarousel pager-item"></span>'))
			if i is currentIndex
				pagerItem.addClass('active')
			pagerItem.html(''+(i+1))
			pagerItem.click {i:i}, (e) -> 
				HolyCarousel.slideTo.apply(self, [e.data.i])
			pager.append(pagerItem)
			
		data.pagerItemSets.push(pagerItems)
		this.data('holycarousel', data)
			
		pager
			
		
	_generateNextButton:() ->
		self = this
		nextBtn = $('<span class="holycarousel next"></span>')
		nextBtn.click -> 
			HolyCarousel.next.apply(self, [])
			
	_generatePrevButton:() ->
		self = this
		prevBtn = $('<span class="holycarousel prev"></span>')
		prevBtn.click -> 
			HolyCarousel.prev.apply(self, [])
			
jQuery.fn.holycarousel = 
jQuery.fn.holyCarousel = 
$.fn.holycarousel = 
$.fn.holyCarousel = (method) ->
	if (HolyCarousel[method])
		return HolyCarousel[method].apply(this, Array.prototype.slice.call(arguments, 1))
	else if (typeof method is 'object' or !method)
		return HolyCarousel.init.apply(this, arguments)
	else
		$.error('Method ' + method + ' does not exist on jQuery.holyCarousel');
	this