<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSeguimentoRequest extends FormRequest
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
            'data_avaliacao' => ['required', 'date'],
            'recidiva_local' => ['nullable', 'boolean'],
            'estado_vital' => ['nullable', 'string', 'max:20'],
            'readmissao' => ['nullable', 'boolean'],
            'reoperacao' => ['nullable', 'boolean'],
            'observacoes' => ['nullable', 'string'],
        ];
    }
}
