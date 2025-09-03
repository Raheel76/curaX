"use client";
import "@ant-design/v5-patch-for-react-19";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input, Form, Select, Checkbox, message } from "antd";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Calendar,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

const { Option } = Select;

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    agreeTerms: "",
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.role.trim()) {
      newErrors.role = "Role name is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
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
      localStorage.setItem("CuraX_form", JSON.stringify(formData));
      console.log("Form Data :", formData);
      setFormData({
        name: "",
        email: "",
        role: "",
        password: "",
        agreeTerms: false,
      });
      message.success("Account created successfully!");
    } catch (error) {
      message.error("Error saving form data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg mx-auto"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-primary mb-2"
          >
            CuraX
          </motion.h1>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Create Your Account
          </h2>
          <p className="text-muted-foreground">
            Join thousands of patients and healthcare professionals
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col auth-input gap-3"
        >
          <div className=" flex flex-col gap-2">
            <span className="text-foreground">First Name</span>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              prefix={<User className="w-4 h-4 text-muted-foreground" />}
              placeholder="Enter your name"
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
            {errors.name && <span className="text-red-600">{errors.name}</span>}
          </div>
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
          <div className=" flex flex-col gap-2">
            <span className="text-foreground">Select Role</span>
            <Select
              name="role"
              value={formData.role || undefined}
              onChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  role: value,
                }));
                setErrors((prev) => ({
                  ...prev,
                  role: "",
                }));
              }}
              placeholder="Select your user type"
              className="bg-input border-border text-foreground"
            >
              <Option value="patient">Patient</Option>
              <Option value="doctor">Doctor</Option>
            </Select>
            {errors.role && <span className="text-red-600">{errors.role}</span>}
          </div>

          <div className=" flex flex-col gap-2">
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

          <div className=" flex flex-col mb-4 gap-2 !w-full">
            <Checkbox
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
              className="!text-white"
            >
              I agree to the{" "}
              <Link href="/terms" className="text-primary hover:text-accent">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:text-accent">
                Privacy Policy
              </Link>
            </Checkbox>
            {errors.agreeTerms && (
              <span className="text-red-600">{errors.agreeTerms}</span>
            )}
          </div>

          <div className="md:col-span-2 mb-0">
            <Button
              type="primary"
              htmlType="submit"
              disabled={loading}
              className="w-full !h-12 bg-primary hover:bg-accent !text-lg border-none text-primary-foreground !font-semibold rounded-lg"
            >
              Create Account
            </Button>
          </div>
          <Button className="w-full !h-12 !bg-transparent hover:bg-accent border-none !text-primary-foreground font-semibold rounded-lg">
            <span>
              <Icon icon="flat-color-icons:google" className=" text-2xl" />
            </span>
            <span className=" text-lg" > Continue with Google</span>
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth"
              className="text-primary hover:text-accent transition-colors font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
