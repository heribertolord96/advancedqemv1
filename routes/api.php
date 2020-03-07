<?php

use Illuminate\Http\Request;

//Auth::routes();
     Route::get('commerces', 		'Admin\CommerceController@index');
    Route::resource('commerces',         'Admin\CommerceController');
    Route::get('commerce\{commerce_slug}','Admin\CommerceController@show');
   Route::get('my_commerces', 'Admin\CommerceController@my_commerces');

//Route::get('api/commerces', 		'Admin\CommerceController@index');
//Route::get('commerce/{commerce_slug}','Admin\CommerceController@show');
//Routes from commerces

