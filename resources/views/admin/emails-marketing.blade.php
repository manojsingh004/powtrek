@extends('admin.layout')

@section('content')
    <h5 class="mb-4 fw-light">
        <a class="text-reset" href="{{ url('panel/admin') }}">{{ __('admin.dashboard') }}</a>
        <i class="bi-chevron-right me-1 fs-6"></i>
        <span class="text-muted">E-mails ({{$data->count()}})</span>
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

                                @if ($data->count() > 0)
                                    <tr>
                                        <th class="active">ID</th>
                                        <th class="active">E-mail</th>
                                    </tr>
                                    @foreach ($data as $email)

                                        <tr>
                                            <td>{{ $email->id }}</td>
                                            <td>{{ $email->email }}</td>
                                        </tr>
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
