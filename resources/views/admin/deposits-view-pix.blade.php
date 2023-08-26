@extends('admin.layout')

@section('content')
    <h5 class="mb-4 fw-light">
        <a class="text-reset" href="{{ url('panel/admin') }}">{{ __('admin.dashboard') }}</a>
        <i class="bi-chevron-right me-1 fs-6"></i>
        <a class="text-reset" href="{{ url('panel/admin/deposits-pix') }}">{{ __('general.deposits_pix') }}</a>
        <i class="bi-chevron-right me-1 fs-6"></i>
        <span class="text-muted">{{ __('general.deposits_pix') }} #{{$data->id}}</span>
    </h5>

    <div class="content">
        <div class="row">
            @php
                use App\Models\PaymentGateways;
                 $data_pix  = PaymentGateways::findOrFail(11);
                 $fee = $data_pix->fee;
                 $fees_cents = $data_pix->fee_cents;
            @endphp

            <div class="col-lg-12">

                @include('errors.errors-forms')

                <div class="card shadow-custom border-0">
                    <div class="card-body p-lg-5">

                        <dl class="row">

                            <dt class="col-sm-2 text-lg-end">ID</dt>
                            <dd class="col-sm-10">{{$data->id}}</dd>

                            <dt class="col-sm-2 text-lg-end">{{ __('admin.transaction_id') }}</dt>
					 <dd class="col-sm-10">{{$data->txn_id != 'null' ? $data->txn_id : __('general.not_available')}}</dd>

                            <dt class="col-sm-2 text-lg-end">{{ trans('auth.full_name') }}</dt>
                            <dd class="col-sm-10">{{$data->user()->name ?? trans('general.no_available')}}</dd>

                            <dt class="col-sm-2 text-lg-end">{{ __('general.image') }}</dt>
                            <dd class="col-sm-10">
                                <a class="glightbox"
                                   href="{{ Storage::url(config('path.admin').$data->screenshot_transfer) }}"
                                   data-gallery="gallery{{$data->id}}">
                                    {{ trans('admin.view') }} <i class="bi-arrows-fullscreen"></i>
                                </a>
                            </dd>

                            <dt class="col-sm-2 text-lg-end">{{ trans('auth.email') }}</dt>
                            <dd class="col-sm-10">{{$data->user()->email ?? trans('general.no_available')}}</dd>

                            <dt class="col-sm-2 text-lg-end">{{ trans('admin.amount').'(R$)' }}</dt>
                            <dd class="col-sm-10"><strong
                                        class="text-success">{{App\Helper::amountFormat($data->amount)}}</strong>
                            </dd>
                            <dd>
                                @php
                                    $amount_detect = $data->amount/100 * $fee;
                                    $final_amount_paid = $data->amount - $amount_detect - $fees_cents;
                                @endphp
                                <strong class="text-success">
                                    @if(isset($data->user()->name) && $data->status === 'pending')
                                        {!! Form::open([
                                                     'method' => 'POST',
                                                     'url' => 'approve/deposits-pix',
                                                     'class' => 'd-inline'
                                                 ]) !!}

                                        {!! Form::text('amount_pix_added', $final_amount_paid, ['id' => 'pix_amount_get', 'class' => 'form-control float-left', "onkeypress" => "javascript:return isNumber(event)"]); !!}
                                    @endif
                                </strong>
                            </dd>

                            <dt class="col-sm-2 text-lg-end">{{ trans('general.payment_gateway') }}</dt>
                            <dd class="col-sm-10">{{ $data->payment_gateway == 'Bank Transfer' ? __('general.bank_transfer') : $data->payment_gateway}}</dd>

                            <dt class="col-sm-2 text-lg-end">{{ trans('admin.date') }}</dt>
                            <dd class="col-sm-10">{{date($settings->date_format, strtotime($data->date))}}</dd>

                        </dl><!-- row -->


                        @if ($data->status == 'pending')

                            <div class="row mb-3">
                                <div class="col-sm-10 offset-sm-2">

                                    {{-- Approve Donation --}}
                                    @if(isset($data->user()->name) && $data->status === 'pending')
                                        {!! Form::hidden('id',$data->id ); !!}
                                        {!! Form::submit(trans('general.approve'), ['class' => 'btn btn-success pull-right']) !!}

                                        {!! Form::close() !!}
                                        {{--				@endif--}}

                                        {{-- Delete Deposit --}}

                                        {!! Form::hidden('id', $data->id ); !!}
                                        {!! Form::button('<i class="bi-trash me-2"></i>'.trans('general.delete'), ['class' => 'btn btn-danger pull-right margin-separator actionDelete']) !!}

                                        {!! Form::close() !!}
                                    @endif

                                </div>
                            </div>

                        @endif


                    </div><!-- card-body -->
                </div><!-- card  -->
            </div><!-- col-lg-12 -->

        </div><!-- end row -->
    </div><!-- end content -->
@endsection
@section('javascript')
    <script>
        function isNumber(evt) {
            evt = (evt) ? evt : window.event;
            const charCode = (evt.which) ? evt.which : evt.keyCode;
            return charCode === 44 || charCode === 46 || !(charCode > 31 && (charCode < 48 || charCode > 57));
        }
    </script>
@endsection