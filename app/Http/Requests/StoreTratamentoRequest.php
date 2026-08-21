<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreTratamentoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'episodio_id' => ['required', 'integer', 'exists:episodios,id'],
            'tipo'=> ['required', 'string'],
            'data_proposta'=> ['required', 'date'],
            'data_inicio'=> ['required', 'date'],
            'data_fim'=> ['required', 'date'],
            'intencao'=> ['required', 'string'],
            'observacoes'=> ['required', 'string']
        ];
    }
}
