<?php

namespace App\Http\Requests;

use App\Enums\PeriodoEnum;
use App\Enums\PoloEnum;
use App\Enums\TipoActividadeDiariaEnum;
use Illuminate\Validation\Rules\Enum as EnumRule;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAtividadeDiariaRequest extends FormRequest
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
            'polo' => ['required', 'string',  new EnumRule(PoloEnum::class)],
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'periodo' => ['required', 'string', new EnumRule(PeriodoEnum::class)],
            'detalhe' => ['nullable', 'string', 'max:255'],
            'data' => ['required', 'date','after_or_equal:today'],  
            'tipo' => ['required', 'string', new EnumRule(TipoActividadeDiariaEnum::class)],
            'fonte' => ['nullable', 'string', 'max:255'],

        ];
    }
}
