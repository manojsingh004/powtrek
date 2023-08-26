<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="description" content="@yield('description_custom')@if(!Request::route()->named('seo') && !Request::route()->named('profile')){{trans('seo.description')}}@endif">
  <meta name="keywords" content="@yield('keywords_custom'){{ trans('seo.keywords') }}" />
  <meta name="theme-color" content="{{ auth()->check() && auth()->user()->dark_mode == 'on' ? '#303030' : $settings->color_default }}">
  <title>{{ auth()->check() && User::notificationsCount() ? '('.User::notificationsCount().') ' : '' }}@section('title')@show @if( isset( $settings->title ) ){{$settings->title}}@endif</title>
  <!-- Favicon 
 /*<link href="{{ url('public/img', $settings->favicon) }}" rel="icon">
  <link rel="stylesheet" href="{{asset('public/pixie/src/styles.css?v34')}}">
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' rel='stylesheet' type='text/css'>
	<style>
		body, html {
			margin: 0;
			width: 100%;
			height: 100%;
		}
	</style> -->
	<style>
    html, body, #editor-container {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    }
  </style>
  @include('includes.css_general')

  @laravelPWA

  @yield('css')

 @if($settings->google_analytics != '')
  {!! $settings->google_analytics !!}
  @endif
</head>
<body>

<!--<pixie-editor>
	<div class="global-spinner">
		<style>.global-spinner {display: none; align-items: center; justify-content: center; z-index: 999; background: #fff; position: fixed; top: 0; left: 0; width: 100%; height: 100%;}</style>
		<style>.la-ball-spin-clockwise,.la-ball-spin-clockwise>div{position:relative;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.la-ball-spin-clockwise{display:block;font-size:0;color:#1976d2}.la-ball-spin-clockwise.la-dark{color:#333}.la-ball-spin-clockwise>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor}.la-ball-spin-clockwise{width:32px;height:32px}.la-ball-spin-clockwise>div{position:absolute;top:50%;left:50%;width:8px;height:8px;margin-top:-4px;margin-left:-4px;border-radius:100%;-webkit-animation:ball-spin-clockwise 1s infinite ease-in-out;-moz-animation:ball-spin-clockwise 1s infinite ease-in-out;-o-animation:ball-spin-clockwise 1s infinite ease-in-out;animation:ball-spin-clockwise 1s infinite ease-in-out}.la-ball-spin-clockwise>div:nth-child(1){top:5%;left:50%;-webkit-animation-delay:-.875s;-moz-animation-delay:-.875s;-o-animation-delay:-.875s;animation-delay:-.875s}.la-ball-spin-clockwise>div:nth-child(2){top:18.1801948466%;left:81.8198051534%;-webkit-animation-delay:-.75s;-moz-animation-delay:-.75s;-o-animation-delay:-.75s;animation-delay:-.75s}.la-ball-spin-clockwise>div:nth-child(3){top:50%;left:95%;-webkit-animation-delay:-.625s;-moz-animation-delay:-.625s;-o-animation-delay:-.625s;animation-delay:-.625s}.la-ball-spin-clockwise>div:nth-child(4){top:81.8198051534%;left:81.8198051534%;-webkit-animation-delay:-.5s;-moz-animation-delay:-.5s;-o-animation-delay:-.5s;animation-delay:-.5s}.la-ball-spin-clockwise>div:nth-child(5){top:94.9999999966%;left:50.0000000005%;-webkit-animation-delay:-.375s;-moz-animation-delay:-.375s;-o-animation-delay:-.375s;animation-delay:-.375s}.la-ball-spin-clockwise>div:nth-child(6){top:81.8198046966%;left:18.1801949248%;-webkit-animation-delay:-.25s;-moz-animation-delay:-.25s;-o-animation-delay:-.25s;animation-delay:-.25s}.la-ball-spin-clockwise>div:nth-child(7){top:49.9999750815%;left:5.0000051215%;-webkit-animation-delay:-.125s;-moz-animation-delay:-.125s;-o-animation-delay:-.125s;animation-delay:-.125s}.la-ball-spin-clockwise>div:nth-child(8){top:18.179464974%;left:18.1803700518%;-webkit-animation-delay:0s;-moz-animation-delay:0s;-o-animation-delay:0s;animation-delay:0s}.la-ball-spin-clockwise.la-sm{width:16px;height:16px}.la-ball-spin-clockwise.la-sm>div{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-spin-clockwise.la-2x{width:64px;height:64px}.la-ball-spin-clockwise.la-2x>div{width:16px;height:16px;margin-top:-8px;margin-left:-8px}.la-ball-spin-clockwise.la-3x{width:96px;height:96px}.la-ball-spin-clockwise.la-3x>div{width:24px;height:24px;margin-top:-12px;margin-left:-12px}@-webkit-keyframes ball-spin-clockwise{0%,100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}20%{opacity:1}80%{opacity:0;-webkit-transform:scale(0);transform:scale(0)}}@-moz-keyframes ball-spin-clockwise{0%,100%{opacity:1;-moz-transform:scale(1);transform:scale(1)}20%{opacity:1}80%{opacity:0;-moz-transform:scale(0);transform:scale(0)}}@-o-keyframes ball-spin-clockwise{0%,100%{opacity:1;-o-transform:scale(1);transform:scale(1)}20%{opacity:1}80%{opacity:0;-o-transform:scale(0);transform:scale(0)}}@keyframes ball-spin-clockwise{0%,100%{opacity:1;-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);transform:scale(1)}20%{opacity:1}80%{opacity:0;-webkit-transform:scale(0);-moz-transform:scale(0);-o-transform:scale(0);transform:scale(0)}}</style>
		<div class="la-ball-spin-clockwise la-2x">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
	<script>setTimeout(function() {
		var spinner = document.querySelector('.global-spinner');
		if (spinner) spinner.style.display = 'flex';
	}, 50);</script>
</pixie-editor>-->

<div id="editor-container"></div>
<script src="public/pixie/dist/pixie.umd.js"></script>
<!-- <script>
  const pixie = new Pixie({
    selector: "#editor-container",
    baseUrl: 'public/pixie',
    image: "public/pixie/assets/images/samples/sample1.jpg",
    ui: {
      activeTheme: 'dark',
    },
    onSave: async function(data) {
     console.log(data);
    },
  });
</script>-->
<script>

    
    var pixie = new Pixie({
        selector: "#editor-container",
        baseUrl: 'public/pixie/assets',
        crossOrigin: true,
        
        ui: {
        
            openImageDialog: {
                show: true
              /* sampleImages: [
                    {
                        url: 'https://powtips.com/public/pixie/assets/images/samples/sample1.jpg',
                        thumbnail:'public/pixie/assets/images/samples/sample1_thumbnail.jpg',
                    },
                    {
                        url: 'https://powtips.com/public/pixie/assets/images/samples/sample2.jpg',
                        thumbnail:'public/pixie/assets/images/samples/sample2_thumbnail.jpg',
                    },
                    {
                        url: 'https://powtips.com/public/pixie/assets/images/samples/sample3.jpg',
                        thumbnail:'public/pixie/assets/images/samples/sample3_thumbnail.jpg',
                    },
                        
                ]
            */
            }
        }
    });
</script>
</body>
</html>
