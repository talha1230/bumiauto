"use client";

import { useState } from "react";
import { Button, Input, Select, Textarea, Text, Column, Row } from "@once-ui-system/core";

interface LoanInquiryFormProps {
  onSuccess?: () => void;
}

export function LoanInquiryForm({ onSuccess }: LoanInquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    loanType: "",
    loanAmount: "",
    monthlyIncome: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    // Validation
    if (!formData.fullName || !formData.phone || !formData.email || !formData.loanType) {
      setFormStatus({
        type: "error",
        message: "Please fill in all required fields.",
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      setIsSubmitting(false);
      return;
    }

    // Phone validation (Malaysian format)
    const phoneRegex = /^(\+?6?01)[0-46-9]-*[0-9]{7,8}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      setFormStatus({
        type: "error",
        message: "Please enter a valid Malaysian phone number (e.g., 0123456789).",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/loan-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({
          type: "success",
          message: "Thank you! Your loan inquiry has been submitted. We'll contact you within 24-48 hours.",
        });
        // Reset form
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          loanType: "",
          loanAmount: "",
          monthlyIncome: "",
          message: "",
        });
        if (onSuccess) onSuccess();
      } else {
        setFormStatus({
          type: "error",
          message: data.error || "Failed to submit form. Please try again.",
        });
      }
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Column as="form" onSubmit={handleSubmit} gap="16" fillWidth>
      {/* Full Name */}
      <Column gap="8">
        <Text variant="label-default-s" onBackground="neutral-strong">
          Full Name <span style={{ color: "var(--static-red)" }}>*</span>
        </Text>
        <Input
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />
      </Column>

      {/* Phone & Email Row */}
      <Row gap="16" s={{ direction: "column" }}>
        <Column gap="8" flex={1}>
          <Text variant="label-default-s" onBackground="neutral-strong">
            Phone Number <span style={{ color: "var(--static-red)" }}>*</span>
          </Text>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0123456789"
            required
          />
        </Column>

        <Column gap="8" flex={1}>
          <Text variant="label-default-s" onBackground="neutral-strong">
            Email Address <span style={{ color: "var(--static-red)" }}>*</span>
          </Text>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />
        </Column>
      </Row>

      {/* Loan Type */}
      <Column gap="8">
        <Text variant="label-default-s" onBackground="neutral-strong">
          Loan Type <span style={{ color: "var(--static-red)" }}>*</span>
        </Text>
        <select
          id="loanType"
          name="loanType"
          value={formData.loanType}
          onChange={handleChange}
          required
          style={{
            padding: "0.75rem",
            borderRadius: "var(--radius-m)",
            border: "1px solid var(--neutral-alpha-weak)",
            background: "var(--page-background)",
            color: "var(--neutral-on-background-strong)",
            fontSize: "var(--font-size-body-default)",
          }}
        >
          <option value="">Select loan type</option>
          <option value="motorcycle">Motorcycle Loan</option>
          <option value="consumer-durable">Consumer Durable Financing</option>
          <option value="other">Other</option>
        </select>
      </Column>

      {/* Loan Amount & Monthly Income */}
      <Row gap="16" s={{ direction: "column" }}>
        <Column gap="8" flex={1}>
          <Text variant="label-default-s" onBackground="neutral-strong">
            Loan Amount (RM)
          </Text>
          <Input
            id="loanAmount"
            name="loanAmount"
            type="number"
            value={formData.loanAmount}
            onChange={handleChange}
            placeholder="e.g., 5000"
          />
        </Column>

        <Column gap="8" flex={1}>
          <Text variant="label-default-s" onBackground="neutral-strong">
            Monthly Income (RM)
          </Text>
          <Input
            id="monthlyIncome"
            name="monthlyIncome"
            type="number"
            value={formData.monthlyIncome}
            onChange={handleChange}
            placeholder="e.g., 3000"
          />
        </Column>
      </Row>

      {/* Message */}
      <Column gap="8">
        <Text variant="label-default-s" onBackground="neutral-strong">
          Additional Information
        </Text>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us more about your financing needs..."
          rows={4}
        />
      </Column>

      {/* Status Message */}
      {formStatus.type && (
        <Text
          variant="body-default-s"
          onBackground={formStatus.type === "success" ? "success-medium" : "danger-medium"}
        >
          {formStatus.message}
        </Text>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        size="l"
        variant="primary"
        fillWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>

      <Text variant="body-default-xs" onBackground="neutral-weak" align="center">
        By submitting this form, you agree to our Terms of Service and Privacy Policy.
      </Text>
    </Column>
  );
}
