<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Slot;
use App\Models\Episodio;
use App\Models\User;
use App\Models\Doente;

class CasoPlaneado extends Model
{
    /** @use HasFactory<\Database\Factories\CasoPlaneadoFactory> */
    use HasFactory;

    protected $table = 'casos_planeados';

    protected $fillable = [
        'slot_id',
        'episodio_id',
        'ordem',
        'procedimento_previsto',
        'duracao_prevista_min',
        'anestesia_apto',
        'cama_destino',
        'internamento_em',
        'cirurgiao_id',
        'observacoes',
    ];

    protected $casts = [
        'internamento_em' => 'datetime',
        'anestesia_apto' => 'boolean',
    ];

    public function slot()
    {
        return $this->belongsTo(Slot::class);
    }

    public function episodio()
    {
        return $this->belongsTo(Episodio::class);
    }

    public function cirurgiao()
    {
        return $this->belongsTo(User::class, 'cirurgiao_id');
    }

    public function doente()
    {
        return $this->hasOneThrough(
            Doente::class,
            Episodio::class,
            'id', // Foreign key on the Episodio table
            'id', // Foreign key on the Doente table
            'episodio_id', // Local key on the CDT table
            'doente_id' // Local key on the Episodio table
        );
    }

    // caso equipa relationship
    public function casoEquipa()
    {
        return $this->hasMany(CasoEquipa::class);   
    }
}
