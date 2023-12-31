<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deposits extends Model
{

    protected $guarded = array();
    const CREATED_AT = 'date';
    const UPDATED_AT = null;


    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'id', 'users')->first();
    }

}
