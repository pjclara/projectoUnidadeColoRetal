<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEpisodioRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->can('episodio.create') ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'doente_id' => ['required', 'integer', 'exists:doentes,id'],
            'tipo' => ['required', 'string', 'max:100'],
            'estado' => ['required', 'string', 'max:30'],
            'motivo' => ['nullable', 'string', 'max:255'],
            'observacoes' => ['nullable', 'string'],
            'diagnostico' => ['nullable', 'string', 'max:255'],
            'cid10' => ['nullable', 'string', 'max:10'],
            'data_diagnostico' => ['nullable', 'date'],
            'centro_referencia' => ['nullable', 'boolean'],
            'pai_entrada' => ['nullable', 'string', 'max:255'],
            'pai_saida' => ['nullable', 'string', 'max:255'],
            'motivo_saida' => ['nullable', 'string', 'max:255'],
            'user_id' => ['nullable', 'integer', 'exists:users,id'],
        ];

    }
}
