@extends('admin.layout')

@section('content')
    <h5 class="mb-4 fw-light">
        <a class="text-reset" href="{{ url('panel/admin') }}">{{ __('admin.dashboard') }}</a>
        <i class="bi-chevron-right me-1 fs-6"></i>
        <span class="text-muted">{{ __('general.deposits_pix') }} ({{$data->total()}})</span>
    </h5>

    <div class="content">
        <div class="row">

            <div class="col-lg-12">

                @if (session('success_message'))
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <i class="bi bi-check2 me-1"></i> {{ session('success_message') }}

                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                @endif

                <div class="card shadow-custom border-0">
                    <div class="card-body p-lg-4">

                        <div class="table-responsive p-0">
                            <table class="table table-hover">
                                <tbody>

                                @if ($data->total() !=  0 && $data->count() != 0)
                                    <tr>
                                        <th class="active">ID</th>
                                        <th class="active">{{ trans('admin.user') }}</th>
                                        <th class="active">{{ trans('admin.transaction_id') }}</th>
                                        <th class="active">{{ trans('admin.payer') }}</th>
                                        <th class="active">{{ trans('admin.amount') }}</th>
                                        <th class="active">{{ trans('general.payment_gateway') }}</th>
                                        <th class="active">{{ trans('admin.date') }}</th>
                                        <th class="active">{{ trans('admin.pix_screen_shot') }}</th>
                                        <th class="active">{{ trans('admin.status') }}</th>
                                    </tr><!-- /.TR -->


                                    @foreach ($data as $deposit)

                                        <tr>
                                            <td>{{ $deposit->id }}</td>
                                            <td>
                                                @if (isset($deposit->user()->username))
                                                    <a href="{{url($deposit->user()->username)}}" target="_blank">
                                                        {{$deposit->user()->username}} <i
                                                                class="bi-box-arrow-up-right"></i>
                                                    </a>
                                                @else
                                                    {{ __('general.no_available') }}
                                                @endif
                                            </td>
                                            <td>{{ $deposit->txn_id }}</td>
                                            <td>{{ $deposit->payer_name }}</td>
                                            <td>{{ Helper::amountFormat($deposit->amount) }}</td>
                                            <td>{{ $deposit->payment_gateway }}</td>
                                            <td>{{date($settings->date_format, strtotime($deposit->date))}}</td>


                                            <td>
                                                <a href="{{ Storage::url(config('path.admin').$deposit->screenshot_transfer) }}"
                                                   target="_blank">
                                                    {{ trans('admin.view') }} <i
                                                            class="fa fa-external-link-square-alt"></i>
                                                </a></td>

                                            @php

                                                if ($deposit->status == 'pending' ) {
                                                             $mode    = 'warning';
                                                                       $_status = trans('admin.pending');
                                                    } else {
                                                      $mode = 'success';
                                                                       $_status = trans('general.success');
                                                    }

                                            @endphp

                                            


                                            <td>
                                                <span class="rounded-pill badge bg-{{ $deposit->status == 'pending' ? 'warning' : 'success' }} text-uppercase">{{ $deposit->status == 'pending' ? __('admin.pending') : __('general.success') }}</span>
                                                @if ($deposit->payment_gateway == 'Bank Transfer' || $deposit->payment_gateway == 'Pix')
                                                    <a href="{{ url('panel/admin/deposits-pix', $deposit->id) }}"
                                                       class="btn btn-success btn-sm rounded-pill"
                                                       title="{{ __('admin.view') }}">
                                                        <i class="bi-eye"></i>
                                                    </a>
                                                @endif
                                            </td>
                                        </tr><!-- /.TR -->
                                    @endforeach

                                @else
                                    <h5 class="text-center p-5 text-muted fw-light m-0">{{ trans('general.no_results_found') }}</h5>
                                @endif

                                </tbody>
                            </table>
                        </div><!-- /.box-body -->

                    </div><!-- card-body -->
                </div><!-- card  -->

                @if ($data->lastPage() > 1)
                    {{ $data->onEachSide(0)->links() }}
                @endif
            </div><!-- col-lg-12 -->

        </div><!-- end row -->
    </div><!-- end content -->
@endsection
