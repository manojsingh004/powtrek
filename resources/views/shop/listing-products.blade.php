<div>
    <a href="{{ url('shop/product', $product->id) }}" class="link-shop">
        <div class="card card-updates h-100 card-user-profile shadow-sm">
		<span class="badge type-item p-2 badge-pill">
			{!! ($product->type == 'digital')
				? '<i class="bi-cloud-download mr-2"></i>'. __('general.digital_download')
				: (($product->type == 'physical')
				? '<i class="bi-controller mr-2"></i>'. __('general.physical_products')
				: '<i class="bi-lightning-charge mr-2"></i>'. __('general.custom_content'))
			!!}
		</span>

            <div class="card-cover position-relative"
                 style="background: url({{ Helper::getFile(config('path.shop').$product->previews[0]->name) }}) #efefef center center; background-size: cover; height:300px;">
                <span class="price-shop">
                    @if ($product->type == 'physical' && $product->quantity == 0)
                        {{ __('general.sold_out') }}
                    @else
                        {{ Helper::amountFormatDecimal($product->price) }}
                    @endif
                </span>

                @if($product->url_video)
                        <!-- Button trigger modal -->
                        <button onclick="event.preventDefault();" type="button" class="buttom-video-shop" data-toggle="modal"
                                data-target="#product{{$product->id}}">
                            PREVIEW
                        </button>
                @endif
            </div>

            <div class="card-body">
                <h5 class="card-title mb-2 text-truncate-2">{{$product->name }}</h5>
                <p class="my-2 text-muted card-text text-truncate-2">{{ Str::limit($product->description, 100, '...') }}</p>
            </div><!-- card-body -->

            <div class="card-footer pt-0 bg-transparent border-top-0">
                <div class="d-flex align-items-end justify-content-between">
                    <div class="d-flex align-items-center">
                        <img class="rounded-circle mr-3"
                             src="{{ Helper::getFile(config('path.avatar').$product->user()->avatar) }}" width="40"
                             height="40" alt="{{$product->user()->username}}">
                        <div class="small">
                            <div><strong>{{ '@'.$product->user()->username }}</strong></div>
                            <div class="text-muted">{{ Helper::formatDate($product->created_at) }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div><!-- End Card -->
    </a>
    @if($product->url_video)

        <!-- Modal -->
        <div class="modal fade" id="product{{$product->id}}" tabindex="-1" role="dialog"
             aria-labelledby="product{{$product->id}}Label" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="product{{$product->id}}Label">{{$product->name}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <iframe id="yvideo" class="yvideo" width="800" height="400" src="{{$product->url_video}}"
                                title="YouTube video player" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen></iframe>
                    </div>
                    <div class="modal-footer">

                        @if (!auth()->check())

                            <div class="d-flex justify-content-center align-items-center container col-sm-12">


                                <div class="alert alert-danger alert-dismissible fade show col-sm-12" role="alert">
                                    <strong>Novo por aqui?</strong> Caso ainda não seja usuário da plataforma,
                                    efetue o cadastro para adquirir este produto e ter acesso a outros conteúdos.
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>

                            <div class="d-flex justify-content-center align-items-center container col-12">

                                {!! Form::open([ 'method' => 'POST', 'url' => 'shop/add-email', 'class' => 'col-sm-12 col-md-10' ]) !!}
                                <div class="col-auto  mb-4 ">
                                    <label for="addemail">Preencha o campo abaixo com seu e-mail e receba um
                                        brinde!</label>
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text">@</div>
                                        </div>
                                        {!! Form::email('email','', ['placeholder'=>'add your e-mail', 'id' => 'addemail', 'class' => 'form-control col-sm-12 ', "required" => "true"]); !!}
                                    </div>
                                </div>
                                <div class="row  mb-4 ">
                                    <div class="col text-center">
                                        <button id="fecharvideo" type="button" class="btn btn-secondary mr-1"
                                                data-dismiss="modal">CANCEL
                                        </button>
                                        {!! Form::submit('OK', ['class' => 'btn btn-1 btn-primary px-5 ml-1']) !!}
                                    </div>
                                </div>


                                {!! Form::close() !!}
                            </div>
                        @elseif (auth()->check() && auth()->id() != $product->user()->id
                          || auth()->check()
                          && auth()->id() != $product->user()->id
                          && $product->type == 'custom'
                          || auth()->check()
                          && auth()->id() != $product->user()->id
                          && $product->type == 'physical'
                          || auth()->guest()
                          )
                            <button id="fecharvideo" type="button" class="btn btn-secondary" data-dismiss="modal">CANCEL
                            </button>
                            <a href="{{ url('shop/product', $product->id) }}" class="btn btn-1 btn-primary">
                                {{ $product->quantity == 0 && $product->type == 'physical' ? __('general.sold_out') : __('general.buy_now') }}
                            </a>
                        @elseif (auth()->check() && auth()->id() != $product->user()->id && $product->type == 'digital')
                            <button id="fecharvideo" type="button" class="btn btn-secondary" data-dismiss="modal">CANCEL
                            </button>
                            <a class="btn btn-1 btn-primary" href="{{ url('product/download', $product->id) }}">
                                {{ __('general.download') }}
                            </a>

                        @elseif (auth()->check() && auth()->id() == $product->user()->id)
                            <button id="fecharvideo" type="button" class="btn btn-secondary" data-dismiss="modal">CANCEL
                            </button>
                            <a class="btn btn-1 btn-primary" href="#" data-toggle="modal" data-target="#editForm">
                                <i class="bi-pencil mr-1"></i> {{ __('admin.edit') }}
                            </a>

                            <form method="post" action="{{ url('delete/product', $product->id) }}">
                                @csrf
                                <button class="btn btn-1 btn-outline-danger actionDeleteItem" type="button">
                                    <i class="bi-trash mr-1"></i> {{ __('admin.delete') }}
                                </button>
                            </form>

                            @include('shop.modal-edit')
                        @else
                            <button id="fecharvideo" type="button" class="btn btn-secondary" data-dismiss="modal">CANCEL
                            </button>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    @endif
</div>
