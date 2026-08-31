<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCirurgiaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->can('cirurgium.create') ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'caso_planeado_id' => ['nullable', 'integer', 'exists:casos_planeados,id'],
            'procedimento' => ['nullable', 'string', 'max:300'],
            'abordagem' => ['nullable', 'string', 'max:50'],
            'urgencia' => ['nullable', 'boolean'],
            'reto' => ['nullable', 'boolean'],
            'terc_inferior_reto' => ['nullable', 'boolean'],
            'excisao_mesorrecto' => ['nullable', 'boolean'],
            'ressecao_curativa' => ['nullable', 'boolean'],
            'colostomia_definitiva' => ['nullable', 'boolean'],
            'anastomose' => ['nullable', 'boolean'],
            'eras_id' => ['nullable', 'integer', 'exists:avaliacao_eras,id'],
            'observacoes' => ['nullable', 'string', 'max:500'],
        ];
    }
}
