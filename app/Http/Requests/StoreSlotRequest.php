<?php

namespace App\Http\Requests;

use App\Enums\ModalidadeEnum;
use App\Enums\PeriodoEnum;
use App\Enums\PoloEnum;
use App\Enums\SlotEstadoEnum;
use App\Enums\SlotOrigemEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum as EnumRule;

class StoreSlotRequest extends FormRequest
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
            'polo' => ['nullable', 'string', new EnumRule(PoloEnum::class)],
            'periodo' => ['required', 'string', new EnumRule(PeriodoEnum::class)],
            'data' => ['required', 'date'],
            'modalidade' => ['required', 'string', new EnumRule(ModalidadeEnum::class)],
            'sala_id' => ['required', 'integer', 'exists:salas,id'],
            'hora_inicio' => ['required', 'date_format:H:i'],
            'hora_fim_prevista' => ['required', 'date_format:H:i'],
            'estado' => ['required', 'string', new EnumRule(SlotEstadoEnum::class)],
            'origem' => ['required', 'string', new EnumRule(SlotOrigemEnum::class)],
            'observacoes' => ['nullable', 'string'],
        ];
    }
}
