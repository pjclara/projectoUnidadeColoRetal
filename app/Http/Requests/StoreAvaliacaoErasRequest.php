<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAvaliacaoErasRequest extends FormRequest
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
            'data_consulta' => ['required', 'date'],
            'aptidao' => ['required', 'string'],
            'asa' => ['required', 'string'],
            'polo_recomendado' => ['required', 'string'],
            'mfr' => ['nullable', 'boolean'],
            'dias_prehabilitacao' => ['nullable', 'integer'],
            'notas' => ['nullable', 'string'],
            'fonte' => ['nullable', 'string'],
        ];
    }
}
