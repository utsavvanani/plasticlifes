import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Header from '../component/Header';
import Footer from '../component/Footer';
import paypal from '../assets/paypal.png';

const Creditcard = () => {
    const navigate = useNavigate(); // Initialize the navigate function
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolderName: '',
    });

    const [errors, setErrors] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolderName: '',
    });

    // Validation functions
    const validateCardNumber = (value) => {
        const cardNumberPattern = /^[0-9]{16}$/;
        return cardNumberPattern.test(value);
    };

    const validateExpiryDate = (value) => {
        const expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
        return expiryDatePattern.test(value);
    };

    const validateCVV = (value) => {
        const cvvPattern = /^[0-9]{3}$/;
        return cvvPattern.test(value);
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        if (!validateCardNumber(formData.cardNumber)) {
            newErrors.cardNumber = 'Card number must be 16 digits';
            valid = false;
        }
        if (!validateExpiryDate(formData.expiryDate)) {
            newErrors.expiryDate = 'Expiry date must be in MM/YY format';
            valid = false;
        }
        if (!validateCVV(formData.cvv)) {
            newErrors.cvv = 'CVV must be 3 digits';
            valid = false;
        }
        if (!formData.cardHolderName) {
            newErrors.cardHolderName = 'Cardholder name is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Proceed to the success page only after the form is valid
            console.log('Form submitted successfully');
            navigate('/order-success'); // Navigate to the success page
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            <div>
                <Header />
            </div>

            <div className="container mx-auto p-6">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-center mb-6">
                        <p className="text-xl font-semibold text-gray-700">
                            <i className="fa-solid fa-cart-shopping mr-2" />
                            Shopping Cart
                        </p>
                    </div>

                    <div className="mb-6">
                        <p className="text-lg font-semibold text-gray-700">Payment Method</p>
                        <div className="flex space-x-4 mt-2 justify-center">
                            <img src="https://thumbs.dreamstime.com/b/web-183282979.jpg" alt="Visa" className="w-16 h-16" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Rupay-Logo.png" alt="Rupay" className="w-16 h-16" />
                            <img src="https://thumbs.dreamstime.com/b/editorial-mastercard-logo-icon-incorporated-american-multinational-financial-services-corporation-headquartered-141611543.jpg" alt="Mastercard" className="w-16 h-16" />
                            <img src={paypal} alt="PayPal" className="w-16 h-16" />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="card" className="block text-sm font-medium text-gray-700">Card Number</label>
                            <input
                                type="tel"
                                name="cardNumber"
                                id="card_n"
                                maxLength={16}
                                placeholder="0000 XXXX XXXX 0000"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardNumber ? 'border-red-500' : ''}`}
                            />
                            {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber}</p>}
                        </div>

                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label htmlFor="e_date" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                                <input
                                    type="text"
                                    name="expiryDate"
                                    id="e_date"
                                    placeholder="MM/YY"
                                    value={formData.expiryDate}
                                    onChange={handleChange}
                                    className={`w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.expiryDate ? 'border-red-500' : ''}`}
                                />
                                {errors.expiryDate && <p className="text-sm text-red-500">{errors.expiryDate}</p>}
                            </div>

                            <div className="w-1/2">
                                <label htmlFor="CVV" className="block text-sm font-medium text-gray-700">CVV</label>
                                <input
                                    type="password"
                                    name="cvv"
                                    id="CVV"
                                    maxLength={3}
                                    placeholder="CVV"
                                    value={formData.cvv}
                                    onChange={handleChange}
                                    className={`w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cvv ? 'border-red-500' : ''}`}
                                />
                                {errors.cvv && <p className="text-sm text-red-500">{errors.cvv}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Card Holder Name</label>
                            <input
                                type="text"
                                name="cardHolderName"
                                id="name"
                                placeholder="Card Holder Name"
                                value={formData.cardHolderName}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardHolderName ? 'border-red-500' : ''}`}
                            />
                            {errors.cardHolderName && <p className="text-sm text-red-500">{errors.cardHolderName}</p>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Payment
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div>
                <Footer />
            </div>
        </>
    );
};

export default Creditcard;
