<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDoenteRequest;
use App\Models\Doente;
use App\Services\EncryptionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DoenteController extends Controller
{
    public function __construct(
        private EncryptionService $encryptionService
    ) {}

    public function index()
    {
        $doentes = Doente::query()
            ->paginate(15)
            ->through(function (Doente $doente) {
                return [
                    'id' => $doente->id,

                    'nome' => $this->encryptionService->decrypt(
                        $doente->nome_cipher,
                        $doente->nome_iv,
                        $doente->nome_tag,
                    ),

                    'pu' => $this->encryptionService->decrypt(
                        $doente->pu_cipher,
                        $doente->pu_iv,
                        $doente->pu_tag,
                    ),

                    'data_nascimento' => $doente->data_nascimento,

                    'sexo' => $doente->sexo,
                    'created_at' => $doente->created_at,
                    'updated_at' => $doente->updated_at,
                ];
            });

        return Inertia('Doentes/Index', [
            'doentes' => $doentes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDoenteRequest $request, EncryptionService $enc)
    {
        $nome = $enc->encrypt($request->nome);

        $pu = $enc->searchableHash($request->pu);

        $puEncrypted = $enc->encrypt($request->pu);


        $doente = Doente::create([
            'nome_cipher' => $nome['cipher'],
            'nome_iv' => $nome['iv'],
            'nome_tag' => $nome['tag'],
            'pu_cipher' => $puEncrypted['cipher'],
            'pu_iv' => $puEncrypted['iv'],
            'pu_tag' => $puEncrypted['tag'],
            'pu_hash' => $pu,
            'data_nascimento' => $request->data_nascimento,
            'sexo' => $request->sexo,
        ]);

        return redirect()->route('doentes.index')->with('success', 'Doente criado com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Doente $doente)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Doente $doente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Doente $doente, EncryptionService $enc)
    {
        $nome = $enc->encrypt($request->nome);

        $pu = $enc->searchableHash($request->pu);

        $puEncrypted = $enc->encrypt($request->pu);

        $doente->update([
            'nome_cipher' => $nome['cipher'],
            'nome_iv' => $nome['iv'],
            'nome_tag' => $nome['tag'],
            'pu_cipher' => $puEncrypted['cipher'],
            'pu_iv' => $puEncrypted['iv'],
            'pu_tag' => $puEncrypted['tag'],
            'pu_hash' => $pu,
            'data_nascimento' => $request->data_nascimento,
            'sexo' => $request->sexo,
        ]);

        return redirect()->route('doentes.index')->with('success', 'Doente atualizado com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Doente $doente)
    {
        //
    }
}
