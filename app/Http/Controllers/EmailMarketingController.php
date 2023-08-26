<?php

namespace App\Http\Controllers;

use App\Models\MailMarketing;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EmailMarketingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Application|Factory|View
     */
    public function index()
    {
        $data = MailMarketing::paginate(20);
        return view('admin.emails-marketing', compact('data'));
    }

    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        $newEmail = new MailMarketing();
        $newEmail->email = $request->email ?? '';
        $newEmail->save();

        return back();
    }
}
