<?php

namespace App\Http\Controllers;

use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        // $this->authorize('users.viewAny');

        $users = User::with('roles')->paginate(15);

        return Inertia::render('Users/Index', [
            'users' => $users,
            'roles' => Role::all()->map(function($role) {
                return ['value' => $role->id, 'label' => ucfirst($role->name)];
            }),
        ]);
    }

    public function store(Request $request)
    {
        // $this->authorize('users.create');

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'abreviatura' => 'required|string|max:10',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'nullable|string|min:8',
            'numero_mecanografico' => 'nullable|string|max:20|unique:users',
            'categoria' => 'nullable|string|max:80',
            'especialidade' => 'nullable|string|max:100',
            'ativo' => 'nullable|boolean',
            'roles' => 'nullable|array',
            'roles.*' => 'integer|exists:roles,id',
        ]);

        // password is optional, if not provided, set a default password
        if (empty($validatedData['password'])) {
            $validatedData['password'] = bcrypt('defaultpassword'); // set a default password
        } else {
            $validatedData['password'] = bcrypt($validatedData['password']);
        }

        $user = User::create($validatedData);
        if (isset($validatedData['roles'])) {
            $user->roles()->sync($validatedData['roles']);
        }

        return redirect()->route('users.index', $user)->with('success', 'User created successfully.');
    }

    public function update(Request $request, User $user)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'abreviatura' => 'required|string|max:10',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'numero_mecanografico' => 'nullable|string|max:20|unique:users,numero_mecanografico,' . $user->id,
            'categoria' => 'nullable|string|max:80',
            'especialidade' => 'nullable|string|max:100',
            'ativo' => 'nullable|boolean',
            'roles' => 'nullable|array',
            'roles.*' => 'integer|exists:roles,id',
        ]);

        $user->update($validatedData);
        if (isset($validatedData['roles'])) {
            $user->roles()->sync($validatedData['roles']);
        }

        return redirect()->route('users.index', $user)->with('success', 'User updated successfully.');
    }
}
