<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use App\Enums\PoloEnum;
class StoreSalaRequest extends FormRequest
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
            'polo' => ['required', 'string', new Enum(PoloEnum::class)],
            'codigo' => ['required', 'string', 'max:255'],
            'designacao' => ['required', 'string', 'max:255'],
            'ativa' => ['required', 'boolean'],
        ];
    }
}
