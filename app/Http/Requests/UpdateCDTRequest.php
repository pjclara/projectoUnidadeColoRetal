<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCDTRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->can('c-d-t.update') ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'data_pedido' => ['required', 'date'],
            'data_discussao' => ['required','after_or_equal:data_pedido', 'date'],
            'decisao' => ['required', 'string'],
            'estadio_clinico' => ['required', 'string', 'max:40'],
        ];
    }
}
