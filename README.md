# HolyCarousel


A spartan responsive carousel... apart from the control generation, which is (so far as I'm aware) pretty unique.

## Basic Options

When initialising the carousel, there are a few (and I really mean a few) options you can give it to alter the behaviour.

You can change the duration of the animation by setting `animationTime` to a non-negative integer - the number of milliseconds the animation should run for.
	$('#carousel').holyCarousel({animationTime: 100})


You can stop the carousel trying to detect the container's width by setting `responsive` to false.
	$('#carousel').holyCarousel({responsive:false});

It's possible to tell the carousel to show the full extent of every slide as it animates by setting `alterHeight` to true.
	$('#carousel').holyCarousel({alterHeight: true})



## Generation

To generate previous and next buttons use:

	$('#carousel').holyCarousel('generate', 'prev-button')
	
and:

	$('#carousel').holyCarousel('generate', 'next-button')

What these do is generate jQuery objects which have events bound to them. All you need to do is add them to whichever element you want them in. These will not contain any text or icon of any kind, but you can just use `.html()` to resolve that. You can generate as many of anything as you wish to.

You can generate a pager with:

	$('#carousel').holyCarousel('generate', 'pager')
	
By default this will create a pager with numbers starting from 1, but it can be customised like so:

	$('#carousel').holyCarousel('generate', 'pager', {
		pagerItemText: '<span class="circle"></span>'
	})
	
You can even generate an auxillery carousel, which will move in sync with the main one with:

	$('#carousel').holyCarousel('generate', 'carousel', {
		altSlides:['alice', 'bob', 'claire', 'thad'], //required. This must be the same length as the main carousel.
		altSlideWrapper: <div class="name"></div> //Optional. They will still be wrapped, but you don't control what with.
	})
	