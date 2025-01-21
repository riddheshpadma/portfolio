import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { db } from "../firebaseConfigue";
import { collection, addDoc } from "firebase/firestore";

const ContactForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const onSubmit = async (data) => {
        try {
            const docRef = await addDoc(collection(db, "formData"), {
                name: data.name,
                email: data.email,
                number: data.number,
                company: data.company,
                message: data.message,
            });
            console.log("Document written with ID: ", docRef.id);
            setPopupMessage("Data stored successfully!");
            setShowPopup(true);
            reset(); // Reset the form
        } catch (e) {
            console.error("Error adding document: ", e);
            setPopupMessage("An error occurred while storing data!");
            setShowPopup(true);
        }
    };

    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                setShowPopup(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showPopup]);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <input
                        {...register("name", { required: "Name is required" })}
                        type="text"
                        placeholder="Your Name"
                        className="input-field"
                        aria-label="Your Name"
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                    <input
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address",
                            },
                        })}
                        type="email"
                        placeholder="Your Email"
                        className="input-field"
                        aria-label="Your Email"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                    <input
                        {...register("number", {
                            required: "Phone number is required",
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Invalid phone number format",
                            },
                        })}
                        type="tel"
                        placeholder="Your Number"
                        className="input-field"
                        aria-label="Your Number"
                    />
                    {errors.number && <p className="text-red-500">{errors.number.message}</p>}

                    <input
                        {...register("company", { required: "Company is required" })}
                        type="text"
                        placeholder="Your Company"
                        className="input-field"
                        aria-label="Your Company"
                    />
                    {errors.company && <p className="text-red-500">{errors.company.message}</p>}
                </div>
                <div>
                    <textarea
                        {...register("message", { required: "Message is required" })}
                        placeholder="Your Message"
                        rows="4"
                        className="input-field"
                        aria-label="Your Message"
                    />
                    {errors.message && <p className="text-red-500">{errors.message.message}</p>}
                </div>
                <div className="flex flex-col justify-center items-center py-10">
                    <button
                        type="submit"
                        className="px-10 py-3.5 overflow-hidden group bg-gradient-to-r from-white to-slate-200 relative hover:bg-gradient-to-r hover:from-white hover:to-slate-200 text-black transition-all ease-out duration-300"
                    >
                        <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-black opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"></span>
                        <span className="relative text-xl font-semibold">Send Message</span>
                    </button>
                    {showPopup && <div className="py-5">{popupMessage}</div>}
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
