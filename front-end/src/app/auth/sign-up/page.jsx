'use client';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import SubmitButton from "@/app/components/SubmitButton";
import {techOccupations} from "@/app/data/occupations";
function RegisterForm() {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: '',
            occupation: '',
            bio: '',
            avatar: null,
        }
    });
    const [showPassword, setShowPassword] = useState(false);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);
    const password = watch('password');
    const passwordRules = {
        length: password?.length >= 8,
        upper: /[A-Z]/.test(password || ''),
        lower: /[a-z]/.test(password || ''),
        digit: /\d/.test(password || ''),
        symbol: /[^A-Za-z0-9]/.test(password || ''),
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue('avatar', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg space-y-6">
                <h2 className="text-3xl font-bold">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">First Name</label>
                            <input
                                type="text"
                                {...register('firstName', { required: 'First name is required' })}
                                className="w-full bg-gray-700 p-2 rounded"
                            />
                            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                        </div>
                        <div>
                            <label className="block mb-1">Last Name</label>
                            <input
                                type="text"
                                {...register('lastName', { required: 'Last name is required' })}
                                className="w-full bg-gray-700 p-2 rounded"
                            />
                            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="w-full bg-gray-700 p-2 rounded"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Password & Confirm */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', {
                                        required: 'Password is required',
                                        validate: {
                                            length: (v) => v.length >= 8 || 'Minimum 8 characters',
                                            upper: (v) => /[A-Z]/.test(v) || 'One uppercase required',
                                            lower: (v) => /[a-z]/.test(v) || 'One lowercase required',
                                            digit: (v) => /\d/.test(v) || 'One number required',
                                            symbol: (v) => /[^A-Za-z0-9]/.test(v) || 'One symbol required',
                                        },
                                    })}
                                    className="w-full bg-gray-700 p-2 rounded pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-gray-300"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>

                        <div>
                            <label className="block mb-1">Confirm Password</label>
                            <input
                                type="password"
                                {...register('confirmPassword', {
                                    required: 'Confirm your password',
                                    validate: (value) => value === password || 'Passwords do not match',
                                })}
                                className="w-full bg-gray-700 p-2 rounded"
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                        </div>
                    </div>

                    {/* Live password rule feedback */}
                    <div className="text-sm text-gray-400 space-y-1">
                        <p>Password must contain:</p>
                        <ul className="ml-4 list-disc">
                            {Object.entries(passwordRules).map(([key, valid]) => (
                                <li key={key} className={valid ? 'text-green-400' : 'text-red-400'}>
                                    {key === 'length' && 'At least 8 characters'}
                                    {key === 'upper' && 'An uppercase letter'}
                                    {key === 'lower' && 'A lowercase letter'}
                                    {key === 'digit' && 'A number'}
                                    {key === 'symbol' && 'A special character'}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Country & Role */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">Country</label>
                            <input
                                type="text"
                                defaultValue="Bangladesh"
                                {...register('country', { required: 'Country is required' })}
                                className="w-full bg-gray-700 p-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Role</label>
                            <select
                                {...register('role', { required: 'Role is required' })}
                                className="w-full bg-gray-700 p-2 rounded"
                            >
                                <option value="">Select Role</option>
                                <option value="user">User</option>
                                <option value="writer">Writer</option>
                            </select>
                        </div>
                    </div>

                    {/* Occupation */}
                    <div>
                        <label className="block mb-1">Occupation</label>
                        <select
                            {...register('occupation', { required: 'Occupation is required' })}
                            className="w-full bg-gray-700 p-2 rounded"
                        >
                            <option value="" disabled>Select Occupation</option>
                            {techOccupations?.occupations?.map((occupation,idx)=>(
                            <option value={occupation} key={idx}>{occupation}</option>
                            ))}

                            {/*<option value="designer">Designer</option>*/}
                            {/*<option value="marketer">Marketer</option>*/}
                            {/*<option value="blogger">Blogger</option>*/}
                        </select>
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block mb-1">Bio</label>
                        <textarea
                            {...register('bio')}
                            rows={3}
                            className="w-full bg-gray-700 p-2 rounded resize-none"
                        ></textarea>
                    </div>

                    {/* Avatar Upload - Fixed Version */}
                    <div>
                        <label className="block mb-1">Avatar</label>
                        <div className="flex flex-col space-y-3">
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                            />
                            {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar.message}</p>}

                            {/* Preview with key to force re-render */}
                            {preview && (
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={preview}
                                        alt="Avatar preview"
                                        className="h-20 w-20 rounded-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPreview(null);
                                            setValue('avatar', null);
                                            // Reset file input
                                            if (fileInputRef.current) {
                                                fileInputRef.current.value = '';
                                            }
                                        }}
                                        className="text-red-400 hover:text-red-500 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit */}

                    {/*<button*/}
                    {/*    type="submit"*/}
                    {/*    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"*/}
                    {/*>*/}
                    {/*    Register*/}
                    {/*</button>*/}
                    <SubmitButton btnText='Sign Up' />
                {/*    className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition'*/}
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;