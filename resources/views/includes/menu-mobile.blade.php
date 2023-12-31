<div class="menuMobile w-100 bg-white shadow-lg p-3 border-top">
	<ul class="list-inline d-flex bd-highlight m-0 text-center">

				<li class="flex-fill bd-highlight">
					<a class="p-3 btn-mobile" href="{{url('/')}}" title="{{trans('admin.home')}}">
						<i class="feather icon-home icon-navbar"></i>
					</a>
				</li>

				<li class="flex-fill bd-highlight">
					<a class="p-3 btn-mobile" href="{{url('creators')}}" title="{{trans('general.explore')}}">
						<i class="far	fa-compass icon-navbar"></i>
					</a>
				</li>

			@if ($settings->shop)
				<li class="flex-fill bd-highlight">
					<a class="p-3 btn-mobile" href="{{url('shop')}}" title="{{trans('general.shop')}}">
						<i class="feather icon-shopping-bag icon-navbar"></i>
					</a>
				</li>
			@endif

			<li class="flex-fill bd-highlight">
				<a href="{{url('messages')}}" class="p-3 btn-mobile position-relative" title="{{ trans('general.messages') }}">

					<span class="noti_msg notify @if (auth()->user()->messagesInbox() != 0) d-block @endif">
						{{ auth()->user()->messagesInbox() }}
						</span>

					<i class="feather icon-send icon-navbar"></i>
				</a>
			</li>

			<li class="flex-fill bd-highlight">
			    
			    <a href="{{url('settings/page')}}" class="p-3 btn-mobile position-relative" title="{{ trans('general.notifications') }}">
				
			    	<!-- <span class="noti_notifications notify @if (auth()->user()->notifications()->where('status', '0')->count()) d-block @endif">
						{{ auth()->user()->notifications()->where('status', '0')->count() }}
						</span> -->
						
					<img src="{{Helper::getFile(config('path.avatar').auth()->user()->avatar)}}" alt="User" class="rounded-circle avatarUser mr-1" width="31" height="31">
						
				<!-- <i class="far fa-bell icon-navbar"></i> -->
				</a>
			</li>
			</ul>
</div>
