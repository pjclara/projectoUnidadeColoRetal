<?php

namespace App\Http\Requests;

class UpdateEpisodioRequest extends StoreEpisodioRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->can('episodio.update') ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
         return [
            'tipo' => ['required', 'string', 'max:100'],
            'estado' => ['required', 'string', 'max:30'],
            'motivo' => ['required', 'string', 'max:255'],
            'observacoes' => ['nullable', 'string'],
            'diagnostico' => ['required', 'string', 'max:255'],
            'cid10' => ['nullable', 'string', 'max:10'],
            'data_diagnostico' => ['nullable', 'date'],
            'centro_referencia' => ['nullable', 'boolean'],
            'pai_entrada' => ['nullable', 'string', 'max:255'],
            'pai_saida' => ['nullable', 'string', 'max:255'],
            'motivo_saida' => ['nullable', 'string', 'max:255'],
            'user_id' => ['nullable', 'integer', 'exists:users,id'],
        ];
    }
}
