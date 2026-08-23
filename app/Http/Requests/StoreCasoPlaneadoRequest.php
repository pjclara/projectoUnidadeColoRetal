<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCasoPlaneadoRequest extends FormRequest
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
            'slot_id' => ['required', 'integer', 'exists:slots,id'],
            'episodio_id' => ['nullable', 'integer', 'exists:episodios,id'],
            'ordem' => ['required', 'integer'],
            'procedimento_previsto' => ['required', 'string'],
            'duracao_prevista_min' => ['required', 'integer'],
            'anestesia_apto' => ['required', 'boolean'],
            'cama_destino' => ['nullable', 'string'],
            'internamento_em' => ['nullable', 'date'],
            'cirurgiao_id' => ['nullable', 'integer', 'exists:users,id'],
            'observacoes' => ['nullable', 'string'],
        ];
    }
}
