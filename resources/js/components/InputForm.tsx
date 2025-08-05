import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef, FormEventHandler } from "react"
import { usePage } from '@inertiajs/react'
import InputError from '@/components/input-error'
import { useState } from 'react'
import { router } from '@inertiajs/react'
import { Head, useForm } from '@inertiajs/react'

export function InputForm() {
  
    const formRef = useRef<HTMLFormElement>(null);
    const { leaveTypes } = usePage().props;
    const typedLeaveTypes = leaveTypes as { id: number, name: string }[];
    const leave_type = useRef<HTMLSelectElement>(null);
    const start_date = useRef<HTMLSelectElement>(null);
    const end_date = useRef<HTMLSelectElement>(null);
    const reason = useRef<HTMLTextAreaElement>(null);

    const { errors, post, reset, setData, data } = useForm({
        leave_type: '',
        start_date: '',
        end_date: '',
        reason: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('store.leave'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.leave_type) {
                    // reset('leave_type', 'leave_type');
                    leave_type.current?.focus();
                }
                if (errors.start_date) {
                    // reset('leave_type', 'leave_type');
                    start_date.current?.focus();
                }
                if (errors.end_date) {
                    // reset('leave_type', 'leave_type');
                    end_date.current?.focus();
                }
                if (errors.reason) {
                    // reset('leave_type', 'leave_type');
                    reason.current?.focus();
                }
            },
        });
    };

    const handleCancel = () => {
        if (formRef.current) {
            formRef.current.reset();
        }
    };


    return (
        <form ref={formRef} onSubmit={updatePassword} className="space-y-6">
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">

                    <h2 className="text-base/7 font-semibold text-gray-900">New Leave Request</h2>
                    <p className="mt-1 text-sm/6 text-gray-600">
                        This information will be displayed publicly so be careful what you share.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-2">
                            <Label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                Leave Type
                            </Label>
                            <div className="mt-2 grid grid-cols-1">
                                <select 
                                id="leave_type" 
                                name="leave_type" 
                                value={data.leave_type}
                                onChange={(e) => setData('leave_type', e.target.value)}
                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                    <option value="">Please Select</option>
                                    {typedLeaveTypes.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                                
                                <InputError className="mt-2" message={errors.leave_type} />

                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <Label htmlFor="start_date" className="block text-sm/6 font-medium text-gray-900">
                                Start Date
                            </Label>
                            <div className="mt-2">
                                <Input 
                                id="start_date" 
                                name="start_date" 
                                type="date"
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.target.value)}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />

                                <InputError className="mt-2" message={errors.start_date} />

                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <Label htmlFor="end_date" className="block text-sm/6 font-medium text-gray-900">
                                End Date
                            </Label>
                            <div className="mt-2">
                                <Input 
                                id="end_date" 
                                name="end_date" 
                                type="date" 
                                value={data.end_date}
                                onChange={(e) => setData('end_date', e.target.value)}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                <InputError className="mt-2" message={errors.end_date} />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <Label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                                Reason
                            </Label>
                            <div className="mt-2">
                                <textarea 
                                id="reason" 
                                name="reason" 
                                value={data.reason}
                                onChange={(e) => setData('reason', e.target.value)}
                                rows={3} 
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                defaultValue={ ''} 
                                />
                                <InputError className="mt-2" message={errors.reason} />
                            </div>
                            {/* <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences about yourself.</p> */}
                        </div>
                    </div>
                </div>

                {/* <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <Label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                First name
                            </Label>
                            <div className="mt-2">
                                <Input id="first-name" name="first-name" type="text" autoComplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <Label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                                Last name
                            </Label>
                            <div className="mt-2">
                                <Input id="last-name" name="last-name" type="text" autoComplete="family-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>





                        <div className="sm:col-span-2 sm:col-start-1">
                            <Label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                                City
                            </Label>
                            <div className="mt-2">
                                <Input id="city" name="city" type="text" autoComplete="address-level2" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <Label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
                                State / Province
                            </Label>
                            <div className="mt-2">
                                <Input id="region" name="region" type="text" autoComplete="address-level1" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <Label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
                                ZIP / Postal code
                            </Label>
                            <div className="mt-2">
                                <Input id="postal-code" name="postal-code" type="text" autoComplete="postal-code" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">Notifications</h2>
                    <p className="mt-1 text-sm/6 text-gray-600">
                        We'll always let you know about important changes, but you pick what else you want to hear about.
                    </p>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button 
                type="button" 
                className="text-sm/6 font-semibold text-gray-900"
                onClick={handleCancel}
                >
                Cancel
                </button>
                <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Save
                </button>
            </div>
        </form>
    )
}
