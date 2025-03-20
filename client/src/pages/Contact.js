import React from "react";
import { motion } from "framer-motion";
import CommenSection from "../component/CommenSection";

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

function Contact() {
  return (
    <div>
      <div className="container mx-auto py-12 px-4">
        <CommenSection title="Contact Us"></CommenSection>
        <motion.div
          className="text-center"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <p className="text-lg text-[#474747] mb-12">
            We would love to hear from you. Whether you have a question about our
            products, need assistance, or just want to talk, we’re here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-[#e7e7e7] p-8 rounded-lg shadow-md"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <h2 className="text-2xl font-semibold text-[#212121] mb-4">
              Get In Touch
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  className="block text-[#474747] font-semibold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7004]"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-[#474747] font-semibold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7004]"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-[#474747] font-semibold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7004]"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#FF7004] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#212121] transition"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div
            className="flex flex-col justify-center p-8 rounded-lg shadow-md bg-[#f7f7f7]"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <h2 className="text-2xl font-semibold text-[#212121] mb-4">
              Contact Information
            </h2>
            <p className="text-lg text-[#474747] mb-4">
              Feel free to reach out to us via phone or email. We’re always happy
              to assist!
            </p>
            <p className="text-lg text-[#474747] mb-2">
              <strong>Phone:</strong> +1 (123) 456-7890
            </p>
            <p className="text-lg text-[#474747] mb-2">
              <strong>Email:</strong> platiclife@example.com
            </p>
            <p className="text-lg text-[#474747]">
              <strong>Address:</strong> 123 Main St, Anytown, india
            </p>
          </motion.div>
        </div>
      </div>
    </div>

  );
}

export default Contact;
