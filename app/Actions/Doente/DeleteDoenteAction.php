<?php

namespace App\Actions\Doente;

use App\Models\Doente;

class DeleteDoenteAction
{
    public function execute(Doente $doente): void
    {
        $doente->delete();
    }
}