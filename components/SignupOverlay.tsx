"use client";

import React, { useState } from "react";

const SignupOverlay: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
    isOpen,
    onClose,
}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false); // ✅ NEW: Loading state

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // ✅ NEW: Basic front-end validation
        if (!name || !email || !password || !role) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true); // ✅ NEW: Show loading state

            const res = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password, role }),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Signup successful!");
                // ✅ NEW: Reset form
                setName("");
                setEmail("");
                setPassword("");
                setRole("");
                onClose(); // ✅ Already existed
            } else {
                alert("Error: " + data.error);
            }
        } catch (err) {
            alert("Something went wrong. Please try again later.");
        } finally {
            setLoading(false); // ✅ Always reset loading
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/20 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full px-4 py-2 border rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <select
                        className="w-full px-4 py-2 border rounded-md"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="">Select Role</option>
                        <option value="volunteer">Volunteer</option>
                        <option value="ngo">NGO</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-[#FF9933] text-white px-4 py-2 rounded-md disabled:opacity-50"
                        disabled={loading} // ✅ Disable button while loading
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                    <button
                        onClick={onClose}
                        type="button"
                        className="text-sm text-[#FF9933] border border-[#FF9933] w-full px-4 py-2 rounded-md"
                    >
                        Close
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupOverlay;
