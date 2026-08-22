<?php

namespace App\Http\Requests;

use App\Enums\SlotEstado;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rules\Enum as EnumRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSlotRequest extends FormRequest
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
            'polo' => ['required', 'string'],
            'periodo' => ['required', 'string'],
            'data' => ['required', 'date'],
            'modalidade' => ['required', 'string'],
            'sala_id' => ['required', 'integer', 'exists:salas,id'],
            'hora_inicio' => ['required', 'date_format:H:i'],
            'hora_fim_prevista' => ['required', 'date_format:H:i'],
            'estado' => ['required', 'string', new EnumRule(SlotEstado::class)],
            'origem' => ['required', 'string', new EnumRule(\App\Enums\SlotOrigem::class)],
            'observacoes' => ['nullable', 'string'],
        ];
    }
}
