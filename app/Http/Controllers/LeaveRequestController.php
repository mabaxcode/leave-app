<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LeaveType;
use App\Models\LeaveRequest;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class LeaveRequestController extends Controller
{
    public function create()
    {
        $leaveTypes = LeaveType::all();

        return Inertia::render('create-leaves', [
            'leaveTypes' => $leaveTypes,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'leave_type' => ['required'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'reason' => ['required', 'string', 'max:255'],
        ]);

        LeaveRequest::create([
            'user_id'           => Auth::id(),
            'leave_type_id'     => $validated['leave_type'],
            'start_date'        => $validated['start_date'],
            'end_date'          => $validated['end_date'],
            'reason'            => $validated['reason'] ?? null,
        ]);

        // dd($request->all());
        // return redirect()->back()->with('success', 'Leave request submitted.');
        return to_route('create.leaves')->with('success', 'Leave request submitted successfully.');
    }
}
