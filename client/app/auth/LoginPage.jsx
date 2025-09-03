"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input, Form, Checkbox, message } from "antd";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

const generateRandomToken = () => {
  return Math.random().toString(36).substr(2) + Date.now().toString(36);
};

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address!";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required!";
    } else if (formData.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const storedData = localStorage.getItem("CuraX_form");
      if (!storedData) {
        message.error("No user found. Please sign up first.");
      }

      const userData = JSON.parse(storedData);
      if (
        userData.email === formData.email &&
        userData.password === formData.password
      ) {
        const token = generateRandomToken();
        localStorage.setItem("CuraX_token", token);
        console.log("Form Data:", formData);
        console.log("Generated Token:", token);
        setFormData({
          email: "",
          password: "",
        });
        message.success("Log in successfully!");
      }
    } catch (error) {
      message.error("Error during login");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome Back
          </h2>
          <p className="text-muted-foreground">Sign in to your CuraX account</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col auth-input gap-3"
        >
          {" "}
          <div className=" flex flex-col gap-2">
            <span className="text-foreground">Email</span>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              prefix={<Mail className="w-4 h-4 text-muted-foreground" />}
              placeholder="Enter your email"
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
            {errors.email && (
              <span className="text-red-600">{errors.email}</span>
            )}
          </div>
          <div className=" flex flex-col gap-2 mb-4">
            <span className="text-foreground">Password</span>
            <Input.Password
              type="number"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              prefix={<Lock className="w-4 h-4 text-muted-foreground" />}
              placeholder="Create a strong password"
              iconRender={(visible) =>
                visible ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )
              }
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
            {errors.password && (
              <span className="text-red-600">{errors.password}</span>
            )}
          </div>
          <div className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full !h-12 bg-primary hover:bg-accent border-none text-primary-foreground font-semibold rounded-lg"
            >
              Sign In
            </Button>
          </div>
          <Button className="w-full !h-12 !bg-transparent hover:bg-accent border-none !text-primary-foreground font-semibold rounded-lg">
            <span>
              <Icon icon="flat-color-icons:google" className=" text-2xl" />
            </span>
            <span className=" text-lg"> Continue with Google</span>
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-primary hover:text-accent transition-colors font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
